/**
 * 个人资料页面模拟数据
 * @module mock/profile
 */
 export default {
  /** 用户基本信息 */
  userInfo: {
    coupleName: '甜蜜情侣',
    loveLevel: 8,
    avatarUrls: {
      you: '/static/avatar/you.png',
      partner: '/static/avatar/partner.png'
    }
  },
  
  /** 情侣统计数据 */
  stats: [
    { id: 1, value: '45', label: '共同烹饪天数' },
    { id: 2, value: '86%', label: '口味默契度' },
    { id: 3, value: '24', label: '收藏菜谱' }
  ],
  
  /** 功能菜单数据 */
  menuSections: [
    {
      id: 'section1',
      items: [
        {
          id: 'fridge',
          icon: '/static/icon/ideabox.png',
          name: '建议箱',
          path: '/pages/profile/components/ideabox'
        },
        {
          id: 'collection',
          icon: '/static/icon/feed.png',
          name: '投喂',
          path: '/pages/profile/components/feed'
        },
        {
          id: 'task',
          icon: '/static/icon/aboutus.png',
          name: '关于我们',
          path: '/pages/profile/components/aboutus'
        }
      ]
    }
  ]
};