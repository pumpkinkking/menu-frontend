<template>
  <view class="donate-container">
    <view class="page-title">支持作者</view>
    <view class="donate-desc">您的支持是我们持续开发的动力，感谢您的打赏！</view>

    <view class="amount-selection">
      <text class="section-title">选择金额 (元)</text>
      <view class="amount-buttons">
        <button v-for="amount in defaultAmounts" :key="amount" :class="{ 'active': selectedAmount === amount }" @click="selectAmount(amount)">{{ amount }}</button>
        <button class="custom-amount" @click="showCustomAmountInput">{{ customAmount || '自定义' }}</button>
      </view>
      <input v-if="showCustomInput" type="number" v-model.number="customAmount" class="custom-amount-input" placeholder="输入自定义金额" @blur="validateCustomAmount"/>
    </view>

    <view class="payment-method">
      <text class="section-title">选择支付方式</text>
      <view class="method-options">
        <label class="radio-label">
          <radio value="wechat" v-model="selectedMethod" checked/><text>微信支付</text>
        </label>
        <label class="radio-label">
          <radio value="alipay" v-model="selectedMethod"/><text>支付宝</text>
        </label>
      </view>
    </view>

    <button class="donate-btn" @click="submitDonation">确认打赏</button>

    <view class="donor-wall">
      <text class="section-title">爱心榜</text>
      <view class="donor-list">
        <view class="donor-item" v-for="donor in donors" :key="donor.id">
          <text class="donor-name">{{ donor.name }}</text>
          <text class="donor-amount">{{ donor.amount }}元</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 引入mock服务
import { submitDonation, getDonorList } from '@/mock/data.js';

export default {
  data() {
    return {
      selectedAmount: 20,
      defaultAmounts: [5, 10, 20, 50, 100],
      customAmount: null,
      showCustomInput: false,
      selectedMethod: 'wechat',
      donors: []
    };
  },
  onLoad() {
    // 加载捐赠者列表
    this.loadDonorList();
  },
  methods: {
    /**
     * 选择预设金额
     */
    selectAmount(amount) {
      this.selectedAmount = amount;
      this.customAmount = null;
      this.showCustomInput = false;
    },

    /**
     * 显示自定义金额输入框
     */
    showCustomAmountInput() {
      this.showCustomInput = true;
      this.selectedAmount = null;
    },

    /**
     * 验证自定义金额
     */
    validateCustomAmount() {
      if (this.customAmount && this.customAmount < 1) {
        uni.showToast({
          title: '金额不能小于1元',
          icon: 'none'
        });
        this.customAmount = null;
      }
    },

    /**
     * 加载捐赠者列表
     */
    async loadDonorList() {
      try {
        const result = await getDonorList();
        if (result.success) {
          this.donors = result.data;
        }
      } catch (error) {
        console.error('加载捐赠者列表失败:', error);
      }
    },

    /**
     * 提交打赏
     */
    async submitDonation() {
      const amount = this.selectedAmount || this.customAmount;
      if (!amount || amount < 1) {
        uni.showToast({
          title: '请选择或输入有效金额',
          icon: 'none'
        });
        return;
      }

      try {
        // 调用mock接口提交打赏
        const result = await submitDonation({
          amount,
          method: this.selectedMethod,
          donateTime: new Date().toISOString(),
          // 在实际应用中，这里应该有用户信息
          userName: '匿名用户'
        });

        if (result.success) {
          uni.showToast({
            title: '感谢您的支持！',
            icon: 'success'
          });
          // 重新加载捐赠者列表
          this.loadDonorList();
          // 重置选择
          this.selectedAmount = 20;
          this.customAmount = null;
          this.showCustomInput = false;
        } else {
          uni.showToast({
            title: '打赏失败，请稍后重试',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('提交打赏失败:', error);
        uni.showToast({
          title: '系统错误，请稍后重试',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style scoped>
.donate-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin: 30rpx 0 10rpx;
  color: #333;
}

.donate-desc {
  text-align: center;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.section-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin: 30rpx 0 15rpx;
  color: #333;
}

.amount-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
}

.amount-buttons button {
  width: 120rpx;
  height: 60rpx;
  border: 2rpx solid #ddd;
  background-color: #fff;
  color: #333;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.amount-buttons button.active {
  border-color: #007aff;
  background-color: #e8f0fe;
  color: #007aff;
}

.custom-amount {
  flex: 1;
  min-width: 120rpx;
}

.custom-amount-input {
  width: 100%;
  height: 60rpx;
  padding: 0 15rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  font-size: 28rpx;
  margin-top: 15rpx;
  box-sizing: border-box;
}

.payment-method {
  margin-top: 20rpx;
}

.method-options {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 15rpx;
}

.radio-label {
  display: flex;
  align-items: center;
  margin: 20rpx 0;
  font-size: 28rpx;
}

.radio-label radio {
  margin-right: 15rpx;
  transform: scale(1.2);
}

.donate-btn {
  width: 100%;
  height: 80rpx;
  background-color: #ff4d4f;
  color: #fff;
  border-radius: 8rpx;
  font-size: 32rpx;
  margin: 40rpx 0 20rpx;
}

.donor-wall {
  margin-top: 50rpx;
}

.donor-list {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 15rpx;
}

.donor-item {
  display: flex;
  justify-content: space-between;
  padding: 15rpx 0;
  border-bottom: 1rpx solid #eee;
  font-size: 26rpx;
}

.donor-item:last-child {
  border-bottom: none;
}

.donor-name {
  color: #333;
}

.donor-amount {
  color: #ff4d4f;
  font-weight: bold;
}
</style>