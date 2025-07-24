<template>
  <view class="add-dish-modal" v-if="show">
    <view class="modal-mask" @click="handleCancel" @touchmove.prevent catchtouchmove="true" @wheel.prevent></view>
    <view class="modal-content">
      <text class="modal-title">添加新菜品</text>
      <view class="modal-form">
        <!-- 菜品表单内容 -->
        <view class="form-group">
          <text class="form-label">菜品名称</text>
          <input class="form-input" v-model="dish.name" @input="autoFillFields" placeholder="请输入菜品名称">
        </view>
        <view class="form-group">
          <text class="form-label">价格</text>
          <input class="form-input" v-model.number="dish.price" type="number" placeholder="请输入价格">
        </view>
        <view class="form-group">
          <text class="form-label">卡路里</text>
          <input class="form-input" v-model.number="dish.calories" type="number" placeholder="请输入卡路里">
        </view>
        <view class="form-group">
          <text class="form-label">分类</text>
          <picker class="form-picker" @change="handleCategorySelect" :range="categories" :range-key="'name'">
            <view class="picker-text">{{ selectedCategory ? selectedCategory.name : '请选择分类' }}</view>
          </picker>
        </view>
        <view class="form-group">
          <text class="form-label">菜品图片</text>
          <button class="upload-btn" @click="handleImageUpload" :disabled="isUploading">
            {{ isUploading ? '上传中...' : '上传图片' }}
          </button>
          <!-- 上传进度显示 -->
          <view v-if="isUploading" class="upload-progress">
            <progress :percent="uploadProgress" stroke-width="2" activeColor="#ff85a2" backgroundColor="#eee" />
            <text class="progress-text">{{ uploadProgress }}%</text>
          </view>
        </view>
      </view>
      <view class="modal-buttons">
        <button class="cancel-btn" @click="handleCancel">取消</button>
        <button class="confirm-btn" @click="handleConfirm">确认添加</button>
      </view>
    </view>
  </view>
</template>

<script>
import menuService from '@/api/menu';
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    categories: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      dish: {
        name: '',
        price: '',
        calories: '',
        categoryId: '',
        image: ''
      },
      selectedCategory: null,
      // 上传状态管理
      uploadProgress: 0, // 上传进度(0-100)
      isUploading: false, // 是否正在上传
      uploadId: null // 分片上传ID
    };
  },
  methods: {
    /**
     * 处理分类选择事件
     * @param {Object} e - 选择事件对象
     */
    handleCategorySelect(e) {
      const index = e.detail.value;
      this.selectedCategory = this.categories[index];
      this.dish.categoryId = this.selectedCategory.id;
    },
    /**
     * 处理图片上传
     */
    /**
   * 处理图片上传，调用menu.js中的上传接口
   */
  /**
   * 处理图片分片上传并显示进度
   * 实现逻辑：选择文件→初始化上传→分片上传→完成上传→更新进度
   */
  async handleImageUpload() {
    const that = this;
    uni.chooseImage({
      count: 1,
      success: async (res) => {
        that.isUploading = true;
        that.uploadProgress = 0;

        try {
          const tempFilePath = res.tempFilePaths[0];
          // 获取文件信息
          const fileInfo = await wx.getFileInfo({
            filePath: tempFilePath
          });
          const fileSize = fileInfo.size;

          // 1. 初始化上传
          const uploadId = await menuService.imageUpload.initialize();
          console.log('初始化上传ID:', uploadId);
          that.uploadId = uploadId;

          // 2. 配置分片参数
          const chunkSize = 2 * 1024 * 1024; // 2MB/片
          const totalChunks = Math.ceil(fileSize / chunkSize);
          const fileManager = wx.getFileSystemManager();
          // 3. 读取文件内容
          const fileData = await new Promise((resolve, reject) => {
            fileManager.readFile({
              filePath: tempFilePath,
              success: (res) => resolve(res.data),
              fail: (err) => reject(new Error(`读取文件失败: ${err.errMsg}`))
            });
          });
          // 4. 分片上传
          for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, fileSize);
            const chunkData = fileData.slice(start, end);

            // 创建临时文件存储分片数据
            const tempChunkPath = `${wx.env.USER_DATA_PATH}/chunk_${uploadId}_${i+1}`;
            fileManager.writeFile({
              filePath: tempChunkPath,
              data: chunkData,
              encoding: 'binary',
              success: () => {},
              fail: (err) => reject(new Error(`写入分片失败: ${err.errMsg}`))
            });

            // 上传当前分片
            await menuService.imageUpload.uploadChunk({
              uploadId: uploadId,
              chunkNumber: i + 1, // 分片序号从1开始
              chunkFile: tempChunkPath // 传递临时文件路径而非Blob
            });

            // 上传完成后清理临时文件
            fileManager.unlinkSync(tempChunkPath);

            // 更新进度
            that.uploadProgress = Math.floor(((i + 1) / totalChunks) * 100);
          }

          // 5. 完成上传（合并分片）
          const result = await menuService.imageUpload.complete({
            uploadId: uploadId,
            thumbnailWidth: 200,
            thumbnailHeight: 200
          });

          // 6. 上传成功处理
          that.dish.originalUrl = result.originalUrl; // 原图URL
          that.dish.thumbnailUrl = result.thumbnailUrl; // 缩略图URL
          uni.showToast({
            title: '图片上传成功',
            icon: 'success'
          });

        } catch (error) {
          console.error('上传失败:', error);
          uni.showToast({
            title: `上传失败: ${error.message}`,
            icon: 'none',
            duration: 3000
          });
        } finally {
          // 重置上传状态
          that.isUploading = false;
          that.uploadProgress = 0;
          that.uploadId = null;
        }
      },
      fail: (err) => {
        that.isUploading = false;
        console.error('选择图片失败:', err);
        uni.showToast({
          title: '选择图片失败',
          icon: 'none'
        });
      }
    });
  },
    /**
     * 根据菜品名称自动填充卡路里和分类
     */
    autoFillFields() {
      if (!this.dish.name) return;
      
      // 简单的菜品卡路里映射示例
      const caloriesMap = {
        '宫保鸡丁': 350,
        '鱼香肉丝': 320,
        '麻婆豆腐': 280,
        '青椒土豆丝': 150,
        '西红柿炒蛋': 180,
        '红烧肉': 450,
        '清蒸鱼': 200,
        '炒青菜': 100
      };
      
      // 根据名称匹配卡路里
      const lowerName = this.dish.name.toLowerCase();
      for (const [name, calories] of Object.entries(caloriesMap)) {
        if (lowerName.includes(name.toLowerCase())) {
          this.dish.calories = calories;
          break;
        }
      }
      
      // 根据名称关键词匹配分类
      const categoryKeywords = [
        { keywords: ['肉', '牛排', '猪', '牛', '羊', '鸡'], id: 'meat' },
        { keywords: ['鱼', '虾', '海鲜', '贝', '蟹'], id: 'seafood' },
        { keywords: ['蔬菜', '青菜', '豆腐', '菌', '菇'], id: 'vegetable' },
        { keywords: ['汤', '羹', '粥'], id: 'soup' },
        { keywords: ['主食', '米饭', '面条', '馒头', '包子'], id: 'staple' }
      ];
      
      for (const { keywords, id } of categoryKeywords) {
        if (keywords.some(keyword => lowerName.includes(keyword.toLowerCase()))) {
          const matchedCategory = this.categories.find(cat => cat.id === id);
          if (matchedCategory) {
            this.selectedCategory = matchedCategory;
            this.dish.categoryId = id;
            break;
          }
        }
      }
    },
    /**
     * 处理取消按钮点击事件
     */
    handleCancel() {
      this.$emit('close');
    },
    /**
     * 处理确认添加按钮点击事件
     */
    /**
   * 处理确认添加，调用menu.js中的创建菜品接口
   */
  async handleConfirm() {
      // 表单验证
      if (!this.dish.name) {
        uni.showToast({
          title: '请填写菜品名称',
          icon: 'none'
        });
        return;
      }

      try {
        // 调用menu.js中的创建菜品接口
        await menuService.uploadMenu(this.dish);
        uni.showToast({
          title: '菜品添加成功',
          icon: 'success'
        });
        this.$emit('close');
        // 重置表单
        this.dish = {
          name: '',
          price: '',
          calories: '',
          categoryId: '',
          image: ''
        };
        this.selectedCategory = null;
      } catch (error) {
        uni.showToast({
          title: '添加失败，请重试',
          icon: 'none'
        });
        console.error('菜品添加失败:', error);
      }
    }
  }
};
</script>

<style scoped>
.add-dish-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
  text-align: center;
}

.modal-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
}

.form-input {
  width: 100%;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 14px;
}

.form-picker {
  width: 100%;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  align-items: center;
}

.upload-btn {
  width: 100%;
  height: 40px;
  border: 1px dashed #eee;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-buttons {
  display: flex;
  gap: 15px;
}

.cancel-btn, .confirm-btn {
  flex: 1;
  height: 45px;
  border-radius: 8px;
  font-size: 16px;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  border: none;
}

.confirm-btn {
  background-color: #ff85a2;
  color: white;
  border: none;
}
</style>