/*
 * @Author: yylong
 * @Date: 2020-03-12 10:31:34
 * @LastEditTime: 2020-03-13 15:46:14
 * @Description: table columns
 */
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: '分类名称',
    dataIndex: 'adminName',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
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
