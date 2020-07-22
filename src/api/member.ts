import { axios } from '@/utils/request'
import qs from 'qs'
import { Api, TableList, AddOrUpdate, Type } from '../types/api'

/**
 * @description: 用户信息 API
 * @param {Object} login [登录]
 * @return: api
 * @author yylong 2020/03/09
 */

const api: Api = {
  tableClassList: '/api/adminType/index',
  tableInfoList: '/api/admin/index',
  tableClassDelete: '/api/adminType/delete',
  addOrUpdate: '/api/admin/addOrUpdate',
  typeList: '/api/admin/typeList',
  enableAndDisable: '/api/admin/enableAndDisable',
  rank: '/api/statistics',
  updateFinalTarget: '/api/admin/updateFinalTarget',
  classAddOrUpdate: '/api/adminType/addOrUpdate',
  classAdddetail: '/api/adminType/detail',
  updateReturnedMoney: '/api/order/updateReturnedMoney',
  updateOrderIndex: '/api/order/updateOrderIndex',
  isLock: '/api/order/isLock'
}

/**
 * @description: 是否锁定
 * @param {string} username [用户名]
 * @param {string} password [密码]
 * @return: isLock
 */

export function isLock(parameter: any) {
  return axios({
    method: 'post',
    url: api.isLock,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 员工管理 => 员工分类 Table
 * @param {string} password [密码]
 * @return: tableClassList
 */

export function tableClassList(parameter: TableList) {
  return axios({
    method: 'get',
    url: api.tableClassList,
    params: parameter
  })
}

/**
 * @description: 员工管理 => 员工信息 删除
 * @param {string} password [密码]
 * @return: tableInfoList
 */

export function tableClassDelete(parameter: any) {
  return axios({
    method: 'get',
    url: api.tableClassDelete,
    params: parameter
  })
}

/**
 * @description: 员工管理 => 员工信息
 * @param {string} password [密码]
 * @return: tableInfoList
 */

export function tableInfoList(parameter: TableList) {
  return axios({
    method: 'get',
    url: api.tableInfoList,
    params: parameter
  })
}

/**
 * @description: 员工管理 => 员工信息 => 添加员工信息
 * @param {*}
 * @return: parameter
 */

export function addOrUpdate(parameter: AddOrUpdate) {
  return axios({
    method: 'post',
    url: api.addOrUpdate,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 员工管理 => 员工信息 => 添加员工信息 查询分类
 * @param {*}
 * @return: parameter
 */

export function typeList() {
  return axios({
    method: 'get',
    url: api.typeList
  })
}

/**
 * @description: 员工管理 => 员工信息 => 启用 | 停用
 * @param {*}
 * @return: enableAndDisable
 */

export function enableAndDisable(parameter: any) {
  return axios({
    method: 'get',
    url: api.enableAndDisable,
    params: parameter
  })
}

/**
 * @description: 龙虎榜
 * @param {*}
 * @return: rank
 */

export function rank(parameter: Type) {
  return axios({
    method: 'get',
    url: api.rank,
    params: parameter
  })
}

/**
 * @description: 修改销售目标
 * @param {*}
 * @return: updateFinalTarget
 */

export function updateFinalTarget(parameter: any) {
  return axios({
    method: 'post',
    url: api.updateFinalTarget,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 员工分类 => 添加分类
 * @param {*}
 * @return: classAddOrUpdate
 */

export function classAddOrUpdate(parameter: any) {
  return axios({
    method: 'post',
    url: api.classAddOrUpdate,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 员工分类 => 查看详情
 * @param {*}
 * @return: classAdddetail
 */

export function classAdddetail(parameter: any) {
  return axios({
    method: 'get',
    url: api.classAdddetail,
    params: parameter
  })
}

/**
 * @description: 员工分类 => 修改
 * @param {*}
 * @return: updateReturnedMoney
 */

export function updateReturnedMoney(parameter: any) {
  return axios({
    method: 'post',
    url: api.updateReturnedMoney,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 员工分类 => 查看修改修改
 * @param {*}
 * @return: updateOrderIndex
 */

export function updateOrderIndex(parameter: any) {
  return axios({
    method: 'get',
    url: api.updateOrderIndex,
    params: parameter
  })
}
