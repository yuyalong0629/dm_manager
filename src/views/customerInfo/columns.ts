/*
 * @Author: yylong
 * @Date: 2020-03-12 10:31:34
 * @LastEditTime: 2020-03-17 21:29:15
 * @Description: table columns
 */
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: '客户名称',
    dataIndex: 'customName',
    align: 'center'
  },
  {
    title: '对接人姓名',
    dataIndex: 'customRealName',
    align: 'center'
  },
  {
    title: '所属行业',
    dataIndex: 'business',
    align: 'center'
  },
  {
    title: '客户分级',
    dataIndex: 'customLevel',
    align: 'center'
  },
  {
    title: '电话',
    dataIndex: 'phone',
    align: 'center'
  },
  {
    title: '微信',
    dataIndex: 'weiXin',
    align: 'center'
  },
  {
    title: 'QQ',
    dataIndex: 'kouKou',
    align: 'center'
  },
  {
    title: '所属销售',
    dataIndex: 'saleName',
    align: 'center'
  },
  {
    title: '入档日期',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'edit',
    align: 'center',
    scopedSlots: { customRender: 'edit' }
  }
]

export default columns
