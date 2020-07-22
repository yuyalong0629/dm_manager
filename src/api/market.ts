import { axios } from '@/utils/request'
import qs from 'qs'
import { Api, CustomInfoTabType, AddOrUpdateType, CustomAllotType, CustomerIndexType } from '../types/api'

const api: Api = {
  customInfoTab: '/api/custom/index',
  adminSaleList: '/api/custom/adminSaleList',
  addOrUpdate: '/api/custom/addOrUpdate',
  customAllot: '/api/custom/customAllot',
  customExcel: '/api/custom/customExcel',
  publicIndex: '/api/custom/publicIndex',
  customerIndex: '/api/accont/index',
  customerType: '/api/accont/type',
  accountExcel: '/api/account/accountExcel',
  customList: '/api/order/customList',
  finAdminList: '/api/order/finAdminList',
  addOrderUpdate: '/api/order/addOrUpdate',
  orderByAccountList: '/api/accout/orderByAccountList',
  accountClick: '/api/account/accountClick',
  deleteOrder: '/api/order/deleteOrder',
  customUpdateList: '/api/custom/customUpdateList',
  customUpdateAdd: '/api/custom/customUpdateAdd'
}

/**
 * @description: 销售部门 => 客户信息 Table
 * @param {*}
 * @return: customInfoTab
 */

export function customInfoTab(parameter: CustomInfoTabType) {
  return axios({
    method: 'get',
    url: api.customInfoTab,
    params: parameter
  })
}

/**
 * @description: 销售部门 => 客户信息 Select
 * @param {*}
 * @return: adminSaleList
 */

export function adminSaleList(parameter: any) {
  return axios({
    method: 'get',
    url: api.adminSaleList,
    params: parameter
  })
}

/**
 * @description: 销售部门 => 添加客户信息
 * @param {*}
 * @return: addOrUpdate
 */

export function addOrUpdate(parameter: AddOrUpdateType) {
  return axios({
    method: 'post',
    url: api.addOrUpdate,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 销售部门 => 客户信息 => 分配权限
 * @param {*}
 * @return: customAllot
 */

export function customAllot(parameter: CustomAllotType) {
  return axios({
    method: 'get',
    url: api.customAllot,
    params: parameter
  })
}

/**
 * @description: 销售部门 => 客户信息 => 导出
 * @param {*}
 * @return: customExcel
 */

export function customExcel(parameter: CustomAllotType) {
  return axios({
    method: 'get',
    url: api.customExcel,
    responseType: 'blob',
    params: parameter
  })
}

/**
 * @description: 销售部门 => 客户公库
 * @param {*}
 * @return: publicIndex
 */

export function publicIndex(parameter: any) {
  return axios({
    method: 'get',
    url: api.publicIndex,
    params: parameter
  })
}

/**
 * @description: 销售部门 => 客户公众号
 * @param {*}
 * @return: customerIndex
 */

export function customerIndex(parameter: CustomerIndexType) {
  return axios({
    method: 'get',
    url: api.customerIndex,
    params: parameter
  })
}

/**
 * @description: 销售部门 => 客户公众号 => 分类
 * @param {*}
 * @return: customerType
 */

export function customerType() {
  return axios({
    method: 'get',
    url: api.customerType
  })
}

/**
 * @description: 销售部门 => 销售公众号 => 导出
 * @param {*}
 * @return: customExcel
 */

export function accountExcel(parameter: any) {
  return axios({
    method: 'get',
    url: api.accountExcel,
    responseType: 'blob',
    params: parameter
  })
}

/**
 * @description: 销售部门 => 销售公众号 => 汇款客户
 * @param {*}
 * @return: customList
 */

export function customList(parameter: any) {
  return axios({
    method: 'get',
    url: api.customList,
    params: parameter
  })
}

/**
 * @description: 销售部门 => 销售公众号 => 所属渠道
 * @param {*}
 * @return: finAdminList
 */

export function finAdminList(parameter: any) {
  return axios({
    method: 'get',
    url: api.finAdminList,
    params: parameter
  })
}

/**
 * @description: 销售部门 => 销售公众号 => 生成订单
 * @param {*}
 * @return: addOrderUpdate
 */

export function addOrderUpdate(parameter: any) {
  return axios({
    method: 'post',
    url: api.addOrderUpdate,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 销售部门 => 销售公众号 => 订单信息列表
 * @param {*}
 * @return: orderByAccountList
 */

export function orderByAccountList(parameter: any) {
  return axios({
    method: 'get',
    url: api.orderByAccountList,
    params: parameter
  })
}

/**
 * @description: *
 * @param {*}
 * @return: accountClick
 */

export function accountClick(parameter: any) {
  return axios({
    method: 'get',
    url: api.accountClick,
    params: parameter
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return: deleteOrder
 */

export function deleteOrder(parameter: any) {
  return axios({
    method: 'get',
    url: api.deleteOrder,
    params: parameter
  })
}

/**
 * @description: 客户信息追踪
 * @param {*}
 * @return: customUpdateList
 */

export function customUpdateList(parameter: any) {
  return axios({
    method: 'get',
    url: api.customUpdateList,
    params: parameter
  })
}

/**
 * @description: 客户信息追踪添加
 * @param {*}
 * @return: customUpdateAdd
 */

export function customUpdateAdd(parameter: any) {
  return axios({
    method: 'post',
    url: api.customUpdateAdd,
    data: qs.stringify(parameter)
  })
}
