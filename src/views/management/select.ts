/*
 * @Author: yylong
 * @Date: 2020-03-11 15:14:20
 * @LastEditTime: 2020-03-26 14:39:27
 * @Description: 员工分类 checkbox data
 */

const selectList = [
  {
    parentList: {
      title: '员工管理',
      level: '1',
      icon: 'user',
      url: '0',
      typeNum: '1000000001'
    },
    childList: [
      { label: '员工分类', value: '员工分类', level: '2', url: '/index/management', typeNum: '1000000001' },
      { label: '员工信息', value: '员工信息', level: '2', url: '/index/information', typeNum: '1000000001' }
    ]
  },
  {
    parentList: {
      title: '渠道部门',
      icon: 'share-alt',
      level: '1',
      url: '0',
      typeNum: '1000000002'
    },
    childList: [
      { label: '渠道公众号', value: '渠道公众号', level: '2', url: '/index/channelAccounts', typeNum: '1000000002' },
      { label: '渠道抖音', value: '渠道抖音', level: '2', url: '/index/channelTok', typeNum: '1000000002' },
      { label: '渠道B站', value: '渠道B站', level: '2', url: '/index/channelBilibili', typeNum: '1000000002' },
      { label: '渠道B站签约号', value: '渠道B站签约号', level: '2', url: '/index/channelMeipai', typeNum: '1000000002' },
      { label: '渠道快手', value: '渠道快手', level: '2', url: '/index/channelDeftHand', typeNum: '1000000002' },
      { label: '渠道微博', value: '渠道微博', level: '2', url: '/index/channelSina', typeNum: '1000000002' },
      { label: '渠道小红书', value: '渠道小红书', level: '2', url: '/index/channelRedbook', typeNum: '1000000002' },
      { label: '渠道直播', value: '渠道直播', level: '2', url: '/index/channelLive', typeNum: '1000000002' },
      { label: '渠道查询', value: '渠道查询', level: '2', url: '/index/channelSearch', typeNum: '1000000002' },
      { label: '渠道订单', value: '渠道订单', level: '2', url: '/index/channelOrder', typeNum: '1000000002' },
      { label: '渠道审核', value: '渠道审核', level: '2', url: '/index/channelCheck', typeNum: '1000000002' },
      { label: '渠道龙虎榜', value: '渠道龙虎榜', level: '2', url: '/index/channelRank', typeNum: '1000000002' }
    ]
  },
  {
    parentList: {
      title: '销售部门',
      icon: 'shopping-cart',
      level: '1',
      url: '0',
      typeNum: '1000000003'
    },
    childList: [
      { label: '客户信息', value: '客户信息', level: '2', url: '/index/customerInfo', typeNum: '1000000003' },
      { label: '销售公众号', value: '销售公众号', level: '2', url: '/index/customerAccounts', typeNum: '1000000003' },
      { label: '销售抖音', value: '销售抖音', level: '2', url: '/index/customerTok', typeNum: '1000000003' },
      { label: '销售B站', value: '销售B站', level: '2', url: '/index/customerBilibili', typeNum: '1000000003' },
      { label: '销售B站签约号', value: '销售B站签约号', level: '2', url: '/index/customerMeipai', typeNum: '1000000003' },
      { label: '销售快手', value: '销售快手', level: '2', url: '/index/customerDeftHand', typeNum: '1000000003' },
      { label: '销售微博', value: '销售微博', level: '2', url: '/index/customerSina', typeNum: '1000000003' },
      { label: '销售小红书', value: '销售小红书', level: '2', url: '/index/customerRedbook', typeNum: '1000000003' },
      { label: '销售直播', value: '销售直播', level: '2', url: '/index/customerLive', typeNum: '1000000003' },
      { label: '销售查询', value: '销售查询', level: '2', url: '/index/customerSearch', typeNum: '1000000003' },
      { label: '销售订单', value: '销售订单', level: '2', url: '/index/customerOrder', typeNum: '1000000003' },
      { label: '销售审核', value: '销售审核', level: '2', url: '/index/customerCheck', typeNum: '1000000003' },
      { label: '销售公库', value: '销售公库', level: '2', url: '/index/customerPublicBank', typeNum: '1000000003' },
      { label: '销售龙虎榜', value: '销售龙虎榜', level: '2', url: '/index/management', typeNum: '1000000003' }
    ]
  },
  {
    parentList: {
      title: '财务部门',
      icon: 'money-collect',
      level: '1',
      url: '0',
      typeNum: '1000000004'
    },
    childList: [
      { label: '订单报表', value: '订单报表', level: '2', url: '/index/management', typeNum: '1000000004' },
      { label: '订单修改', value: '订单修改', level: '2', url: '/index/management', typeNum: '1000000004' }
    ]
  }
]

export default selectList
