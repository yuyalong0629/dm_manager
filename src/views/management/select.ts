/*
 * @Author: yylong
 * @Date: 2020-03-11 15:14:20
 * @LastEditTime: 2020-03-27 19:39:42
 * @Description: 员工分类 checkbox data
 */

const selectList = [
  {
    parentList: {
      roleName: '员工管理',
      level: '1',
      icon: 'user',
      roleUrl: '0',
      typeNum: '1000000001'
    },
    childList: [
      { label: '员工分类', value: '员工分类', roleName: '员工分类', level: '2', roleUrl: '/index/management', typeNum: '1000000001' },
      { label: '员工信息', value: '员工信息', roleName: '员工信息', level: '2', roleUrl: '/index/information', typeNum: '1000000001' }
    ],
    checkedList: []
  },
  {
    parentList: {
      roleName: '渠道部门',
      icon: 'share-alt',
      level: '1',
      roleUrl: '0',
      typeNum: '1000000002'
    },
    childList: [
      { label: '渠道公众号', value: '渠道公众号', roleName: '渠道公众号', level: '2', roleUrl: '/index/channelAccounts', typeNum: '1000000002' },
      { label: '渠道抖音', value: '渠道抖音', roleName: '渠道抖音', level: '2', roleUrl: '/index/channelTok', typeNum: '1000000002' },
      { label: '渠道B站', value: '渠道B站', roleName: '渠道B站', level: '2', roleUrl: '/index/channelBilibili', typeNum: '1000000002' },
      { label: '渠道B站签约号', value: '渠道B站签约号', roleName: '渠道B站签约号', level: '2', roleUrl: '/index/channelMeipai', typeNum: '1000000002' },
      { label: '渠道快手', value: '渠道快手', roleName: '渠道快手', level: '2', roleUrl: '/index/channelDeftHand', typeNum: '1000000002' },
      { label: '渠道微博', value: '渠道微博', roleName: '渠道微博', level: '2', roleUrl: '/index/channelSina', typeNum: '1000000002' },
      { label: '渠道小红书', value: '渠道小红书', roleName: '渠道小红书', level: '2', roleUrl: '/index/channelRedbook', typeNum: '1000000002' },
      { label: '渠道直播', value: '渠道直播', roleName: '渠道直播', level: '2', roleUrl: '/index/channelLive', typeNum: '1000000002' },
      { label: '渠道查询', value: '渠道查询', roleName: '渠道查询', level: '2', roleUrl: '/index/channelSearch', typeNum: '1000000002' },
      { label: '渠道订单', value: '渠道订单', roleName: '渠道订单', level: '2', roleUrl: '/index/channelOrder', typeNum: '1000000002' },
      { label: '渠道审核', value: '渠道审核', roleName: '渠道审核', level: '2', roleUrl: '/index/channelCheck', typeNum: '1000000002' },
      { label: '渠道龙虎榜', value: '渠道龙虎榜', roleName: '渠道龙虎榜', level: '2', roleUrl: '/index/channelRank', typeNum: '1000000002' }
    ],
    checkedList: []
  },
  {
    parentList: {
      roleName: '销售部门',
      icon: 'shopping-cart',
      level: '1',
      roleUrl: '0',
      typeNum: '1000000003'
    },
    childList: [
      { label: '客户信息', value: '客户信息', roleName: '客户信息', level: '2', roleUrl: '/index/customerInfo', typeNum: '1000000003' },
      { label: '销售公众号', value: '销售公众号', roleName: '销售公众号', level: '2', roleUrl: '/index/customerAccounts', typeNum: '1000000003' },
      { label: '销售抖音', value: '销售抖音', roleName: '销售抖音', level: '2', roleUrl: '/index/customerTok', typeNum: '1000000003' },
      { label: '销售B站', value: '销售B站', roleName: '销售B站', level: '2', roleUrl: '/index/customerBilibili', typeNum: '1000000003' },
      { label: '销售B站签约号', value: '销售B站签约号', roleName: '销售B站签约号', level: '2', roleUrl: '/index/customerMeipai', typeNum: '1000000003' },
      { label: '销售快手', value: '销售快手', roleName: '销售快手', level: '2', roleUrl: '/index/customerDeftHand', typeNum: '1000000003' },
      { label: '销售微博', value: '销售微博', roleName: '销售微博', level: '2', roleUrl: '/index/customerSina', typeNum: '1000000003' },
      { label: '销售小红书', value: '销售小红书', roleName: '销售小红书', level: '2', roleUrl: '/index/customerRedbook', typeNum: '1000000003' },
      { label: '销售直播', value: '销售直播', roleName: '销售直播', level: '2', roleUrl: '/index/customerLive', typeNum: '1000000003' },
      { label: '销售查询', value: '销售查询', roleName: '销售查询', level: '2', roleUrl: '/index/customerSearch', typeNum: '1000000003' },
      { label: '销售订单', value: '销售订单', roleName: '销售订单', level: '2', roleUrl: '/index/customerOrder', typeNum: '1000000003' },
      { label: '销售审核', value: '销售审核', roleName: '销售审核', level: '2', roleUrl: '/index/customerCheck', typeNum: '1000000003' },
      { label: '销售公库', value: '销售公库', roleName: '销售公库', level: '2', roleUrl: '/index/customerPublicBank', typeNum: '1000000003' }
    ],
    checkedList: []
  },
  {
    parentList: {
      roleName: '财务部门',
      icon: 'money-collect',
      level: '1',
      roleUrl: '0',
      typeNum: '1000000004'
    },
    childList: [
      { label: '订单报表', value: '订单报表', roleName: '订单报表', level: '2', roleUrl: '/index/financeTable', typeNum: '1000000004' },
      { label: '订单修改', value: '订单修改', roleName: '订单修改', level: '2', roleUrl: '/index/financeEdit', typeNum: '1000000004' }
    ],
    checkedList: []
  }
]

export default selectList
