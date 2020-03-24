/*
 * @Author: yylong
 * @Date: 2020-03-11 15:14:20
 * @LastEditTime: 2020-03-11 16:06:38
 * @Description: 员工分类 checkbox 数据集合
 */

const selectList = {
  managementList: {
    title: '员工管理',
    icon: 'user',
    childList: [
      { label: '员工分类', value: '员工分类' },
      { label: '员工信息', value: '员工信息' }
    ]
  },
  channelList: {
    title: '渠道部门',
    icon: 'share-alt',
    childList: [
      { label: '品类管理', value: '品类管理' },
      { label: '地区管理', value: '地区管理' },
      { label: '渠道公众号', value: '渠道公众号' },
      { label: '渠道抖音', value: '渠道抖音' },
      { label: '渠道B站', value: '渠道B站' },
      { label: '渠道B站签约号', value: '渠道B站签约号' },
      { label: '渠道快手', value: '渠道快手' },
      { label: '渠道微博', value: '渠道微博' },
      { label: '渠道小红书', value: '渠道小红书' },
      { label: '渠道直播', value: '渠道直播' },
      { label: '渠道查询', value: '渠道查询' },
      { label: '渠道订单', value: '渠道订单' },
      { label: '渠道权限', value: '渠道权限' },
      { label: '渠道龙虎榜', value: '渠道龙虎榜' }
    ]
  },
  saleList: {
    title: '销售部门',
    icon: 'shopping-cart',
    childList: [
      { label: '客户信息', value: '客户信息' },
      { label: '销售公众号', value: '销售公众号' },
      { label: '销售抖音', value: '销售抖音' },
      { label: '销售B站', value: '销售B站' },
      { label: '销售B站签约号', value: '销售B站签约号' },
      { label: '销售快手', value: '销售快手' },
      { label: '销售微博', value: '销售微博' },
      { label: '销售小红书', value: '销售小红书' },
      { label: '销售直播', value: '销售直播' },
      { label: '销售查询', value: '销售查询' },
      { label: '销售订单', value: '销售订单' },
      { label: '销售公库', value: '销售公库' },
      { label: '销售权限', value: '销售权限' }
    ]
  },
  financialList: {
    title: '财务部门',
    icon: '',
    childList: [
      { label: '销售报表', value: '销售报表' },
      { label: '渠道报表', value: '渠道报表' },
      { label: '销售修改', value: '销售修改' },
      { label: '渠道修改', value: '渠道修改' }
    ]
  },
  personnelList: {
    title: '人事部门',
    icon: '',
    childList: [
      { label: '员工管理', value: '员工管理' },
      { label: '销售日报', value: '销售日报' }
    ]
  }
}

export default selectList
