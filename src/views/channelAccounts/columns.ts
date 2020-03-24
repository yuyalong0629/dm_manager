/*
 * @Author: yylong
 * @Date: 2020-03-12 10:31:34
 * @LastEditTime: 2020-03-23 15:24:45
 * @Description: table columns
 */
const columns = [
  {
    title: '公众号',
    dataIndex: 'accountName',
    align: 'center',
    width: '200px',
    fixed: 'left'
  },
  {
    title: '公众号ID',
    dataIndex: 'accountId',
    width: '220px',
    align: 'center'
  },
  {
    title: '所属类别',
    dataIndex: 'accountTypeName',
    align: 'center'
  },
  {
    title: '所属地区',
    dataIndex: 'areaName',
    align: 'center'
  },
  {
    title: '粉丝(W)',
    dataIndex: 'fans',
    align: 'center'
  },
  {
    title: '首条刊例',
    dataIndex: 'firstPrice',
    align: 'center'
  },
  {
    title: '首条成本',
    dataIndex: 'firstCost',
    align: 'center'
  },
  {
    title: '次条刊例',
    dataIndex: 'secondPrice',
    align: 'center'
  },
  {
    title: '次条成本',
    dataIndex: 'secondCost',
    align: 'center'
  },
  {
    title: '3-N条刊例',
    dataIndex: 'threePrice',
    align: 'center'
  },
  {
    title: '3-N次条成本',
    dataIndex: 'threeCost',
    width: '150px',
    align: 'center'
  },
  {
    title: '订单次数',
    dataIndex: 'orderNum',
    align: 'center'
  },
  {
    title: '所属运营渠道',
    dataIndex: 'adminName',
    width: '150px',
    align: 'center'
  },
  {
    title: '公众号属性',
    dataIndex: 'accountType',
    scopedSlots: { customRender: 'accountType' },
    align: 'center'
  },
  {
    title: '公众号分类',
    dataIndex: 'accountState',
    scopedSlots: { customRender: 'accountState' },
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: '200px',
    align: 'center'
  },
  {
    title: '所属公司',
    dataIndex: 'company',
    width: '200px',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'edit',
    align: 'center',
    width: '200px',
    fixed: 'right',
    scopedSlots: { customRender: 'edit' }
  }
]

export default columns
