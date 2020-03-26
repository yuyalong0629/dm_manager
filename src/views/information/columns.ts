/*
 * @Author: yylong
 * @Date: 2020-03-12 10:31:34
 * @LastEditTime: 2020-03-25 15:55:12
 * @Description: table columns
 */
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center'
  },
  {
    title: '所属部门',
    dataIndex: 'type',
    align: 'center'
  },
  {
    title: '电话',
    dataIndex: 'phone',
    align: 'center'
  },
  {
    title: '销售目标',
    dataIndex: 'finalTarget',
    scopedSlots: { customRender: 'finalTarget' },
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
  }
]

export default columns
