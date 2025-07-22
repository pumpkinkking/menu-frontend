<template>
  <view class="qr-modal" @click="$emit('close')">
    <view class="qr-card" @click.stop>
      <image class="qr-code" :src="qrCodeUrl" mode="widthFix"></image>
      <text class="qr-desc">扫码邀请好友一起点餐</text>
      <view class="qr-buttons">
        <button class="qr-btn share-btn" @click="$emit('share')">分享</button>
        <button class="qr-btn save-btn" @click="$emit('save')">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    qrCodeUrl: {
      type: String,
      required: true,
      default: '/static/images/invite-qr.png'
    }
  }
}
</script>

<style scoped>
.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.qr-card {
  width: 280px;
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code {
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
}

.qr-desc {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.qr-buttons {
  display: flex;
  gap: 15px;
  width: 100%;
}

.qr-btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  color: white;
}

.share-btn {
  background-color: #ff85a2;
}

.save-btn {
  background-color: #4cd964;
}
</style>