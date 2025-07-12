# 计划页面API接口文档

## 1. 获取计划列表
- **URL**: `/api/plans`
- **方法**: `GET`
- **响应示例**:
```json
{
  "code": 200,
  "data": [
    { "id": 1, "title": "一周减脂计划", "date": "2023-10-01", "meals": ["早餐：全麦面包+鸡蛋", "午餐：烤鸡胸肉沙拉", "晚餐：清蒸鱼+西兰花"] },
    { "id": 2, "title": "家庭聚餐计划", "date": "2023-10-05", "meals": ["早餐：中式早点", "午餐：火锅", "晚餐：烧烤"] }
  ]
}
```

## 2. 创建新计划
- **URL**: `/api/plans`
- **方法**: `POST`
- **请求参数**:
  - `title`: 计划标题
  - `date`: 计划日期
  - `meals`:  meals数组
- **请求示例**:
```javascript
wx.request({
  url: '/api/plans',
  method: 'POST',
  data: {
    title: '健身增肌计划',
    date: '2023-10-15',
    meals: ['早餐：蛋白粉+燕麦', '午餐：牛排+意面', '晚餐：三文鱼+蔬菜']
  },
  success: (res) => {
    if (res.data.code === 200) {
      wx.showToast({ title: '计划创建成功' });
    }
  }
})
```

## 3. 更新计划
- **URL**: `/api/plans/:id`
- **方法**: `PUT`
- **请求参数**:
  - `id`: 计划ID
  - `title`: 计划标题
  - `date`: 计划日期
  - `meals`:  meals数组

## 4. 删除计划
- **URL**: `/api/plans/:id`
- **方法**: `DELETE`
- **请求参数**:
  - `id`: 计划ID