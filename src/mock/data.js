// 菜谱分类数据
export const recipeCategories = [
  { id: 1, name: '推荐', active: true },
  { id: 2, name: '本周流行', active: false },
  { id: 3, name: '快手菜', active: false },
  { id: 4, name: '健康低脂', active: false },
  { id: 5, name: '节日特辑', active: false }
];

// 菜单分类数据
export const menuCategories = [
  { id: 1, name: '全部', active: true },
  { id: 2, name: '热门推荐', active: false },
  { id: 3, name: '主食', active: false },
  { id: 4, name: '肉类', active: false },
  { id: 5, name: '海鲜', active: false },
  { id: 6, name: '蔬菜', active: false },
  { id: 7, name: '汤品', active: false }
];

// 商品分类数据
export const productCategories = [
  { id: 1, name: '全部食材', active: true },
  { id: 2, name: '肉类', active: false },
  { id: 3, name: '海鲜', active: false },
  { id: 4, name: '蔬菜', active: false },
  { id: 5, name: '调味品', active: false },
  { id: 6, name: '粮油', active: false }
];

// 订单过滤器数据
export const orderFilters = [
  { id: 1, name: '全部订单', active: true },
  { id: 2, name: '待付款', active: false },
  { id: 3, name: '配送中', active: false },
  { id: 4, name: '已完成', active: false }
];

// 菜谱数据
export const recipes = [
  { id: 1, title: '香煎三文鱼配时蔬', image: '/static/images/recipe-main1.jpg', time: '25分钟', category: '健康' },
  { id: 2, title: '意式蘑菇烩饭', image: '/static/images/recipe-main2.jpg', time: '40分钟', category: '主食' },
  { id: 3, title: '法式洋葱汤', image: '/static/images/recipe-main3.jpg', time: '35分钟', category: '汤品' },
  { id: 4, title: '泰式青咖喱鸡', image: '/static/images/recipe-main4.jpg', time: '30分钟', category: '东南亚' }
];

// 厨房食材数据
export const ingredients = [
  { id: 1, name: '三文鱼', quantity: 2, unit: '块' },
  { id: 2, name: '橄榄油', quantity: 150, unit: 'ml' },
  { id: 3, name: '柠檬', quantity: 3, unit: '个' },
  { id: 4, name: '西兰花', quantity: 1, unit: '颗' },
  { id: 5, name: '盐', quantity: 100, unit: 'g' },
  { id: 6, name: '黑胡椒', quantity: 50, unit: 'g' }
];

// 点菜页面数据
export const menuItems = [
  { id: 1, name: '香煎三文鱼', image: '/static/images/salmon.jpg', desc: '鲜嫩多汁的三文鱼配以时蔬', price: 58 },
  { id: 2, name: '意大利面', image: '/static/images/pasta.jpg', desc: '经典意式番茄酱意大利面', price: 36 },
  { id: 3, name: '法式牛排', image: '/static/images/steak.jpg', desc: '三分熟菲力牛排配黑椒汁', price: 88 },
  { id: 4, name: '蔬菜沙拉', image: '/static/images/salad.jpg', desc: '新鲜混合蔬菜配千岛酱', price: 28 },
  { id: 5, name: '奶油蘑菇汤', image: '/static/images/soup.jpg', desc: '浓郁奶油蘑菇风味', price: 22 },
  { id: 6, name: '提拉米苏', image: '/static/images/dessert.jpg', desc: '经典意式甜点', price: 26 }
];

// 订单页面数据
export const orders = [
  { id: 1, orderNo: 'ORD20230512001', date: '2023-05-12', status: '待付款', dishes: [{ id: 1, name: '香煎三文鱼', quantity: 1 }, { id: 2, name: '蔬菜沙拉', quantity: 1 }], totalPrice: 86 },
  { id: 2, orderNo: 'ORD20230510002', date: '2023-05-10', status: '配送中', dishes: [{ id: 3, name: '法式牛排', quantity: 1 }, { id: 5, name: '奶油蘑菇汤', quantity: 1 }], totalPrice: 110 },
  { id: 3, orderNo: 'ORD20230508001', date: '2023-05-08', status: '已完成', dishes: [{ id: 2, name: '意大利面', quantity: 2 }, { id: 6, name: '提拉米苏', quantity: 1 }], totalPrice: 98 }
];

// 商店页面数据
export const products = [
  { id: 1, name: '新鲜三文鱼', image: '/static/images/product-salmon.jpg', spec: '500g/块', price: 68 },
  { id: 2, name: '特级橄榄油', image: '/static/images/product-oil.jpg', spec: '500ml/瓶', price: 45 },
  { id: 3, name: '有机西兰花', image: '/static/images/product-broccoli.jpg', spec: '300g/颗', price: 8 },
  { id: 4, name: '进口柠檬', image: '/static/images/product-lemon.jpg', spec: '100g/个', price: 5 },
  { id: 5, name: '海盐', image: '/static/images/product-salt.jpg', spec: '250g/包', price: 6 },
  { id: 6, name: '黑胡椒粒', image: '/static/images/product-pepper.jpg', spec: '100g/瓶', price: 12 }
];

// 统计数据
export const statsData = [
  { value: '12', label: '共同烹饪' },
  { value: '8', label: '收藏菜谱' },
  { value: '5', label: '待办任务' }
];

// Tab导航数据
export const tabs = [
  { name: '厨房', index: 0, type: 'switch' },
  { name: '点菜', index: 1, type: 'switch' },
  { name: '订单', index: 2, type: 'switch' },
  { name: '商店', index: 3, type: 'switch' },
  { name: '菜谱广场', index: 4, type: 'switch' }
];