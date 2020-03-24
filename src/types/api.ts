/*
 * @Author: yylong
 * @Date: 2020-03-09 16:09:38
 * @LastEditTime: 2020-03-18 19:19:28
 * @Description: 用户 API 接口类型定义
 */

//  API
export interface Api {
  [key: string]: string
}

// 登录
export interface Login {
  username?: string
  password?: string
}

// 删除

export interface IdType {
  id: number
}

// Table
export interface TableList {
  pageNo?: string | number
}

// 员工管理 => 员工信息 => 添加员工
export interface AddOrUpdate {
  id?: number
  realName: string
  userName: string
  adminTypeId: number | string
  type: number | string
  isManager: number | string
  duty: number | string
  phone: string
}

// Type
export interface Type {
  type?: string | number
}

// 销售部门 => 客户信息
export interface CustomInfoTabType {
  pageNo: number
  saleId?: number | string
  customName: string
}

// 销售部门 => 客户信息 添加
export interface AddOrUpdateType {
  id?: number
  customName: string // 客户名称
  customRealName: string // 对接人真实姓名
  business: string // 所属行业
  customLevel: number // 显示是一级、二级、三级   传参是1 2 3
  phone: string
  weiXin: string
  kouKou: string
  comUrl: string // 客户连接
  remark: string // 备注
}

// 销售部门 => 客户信息 分配权限
export interface CustomAllotType {
  customIds: string
  saleId?: number
}

// 销售部门 => 客户公众号
export interface CustomerIndexType {
  accountName: string // 查询账号名
  accountTypeId: number // 分类id
  isAccountState: number // 是否根根据公众号分类查询  1 需要  2 不需要
  areaId: number // 地区id
  finId: string // 所属渠道
  accountState: string //公众号分类
  accountType: string //公众号属性
  sortByFans: string //  粉丝升降序  a:表示粉丝升序；b:表示粉丝降序
  sortByPrice: string // 价格升降序  a:表示价格升序；b:表示价格降序
  fansMin: number // 最小粉丝数
  fansMax: number // 最大粉丝数
  priceMin: number //  最低价格
  priceMax: number // 最大价格
  pageNo: number // 分页
}
