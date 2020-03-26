import { axios } from '@/utils/request'
import qs from 'qs'
import { Api } from '../types/api'

const api: Api = {
  addOrUpdate: '/api/accont/addOrUpdate',
  channelDetail: '/api/account/detail',
  channelOrder: '/api/order/index',
  adminFinList: '/api/order/adminFinList',
  orderDetail: '/api/order/detail',
  confirmOrder: '/api/order/confirmOrder'
}

/**
 * @description: 渠道部门 => 添加信息
 * @param {*}
 * @return: addOrUpdate
 */

export function addOrUpdate(parameter: any) {
  return axios({
    method: 'post',
    url: api.addOrUpdate,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 渠道部门 => 渠道订单
 * @param {*}
 * @return: channelOrder
 */

export function channelOrder(parameter: any) {
  return axios({
    method: 'get',
    url: api.channelOrder,
    params: parameter
  })
}

/**
 * @description: 渠道部门 => 渠道订单 => 所属销售
 * @param {*}
 * @return: adminFinList
 */

export function adminFinList(parameter: any) {
  return axios({
    method: 'get',
    url: api.adminFinList,
    params: parameter
  })
}

/**
 * @description: 渠道部门 => 渠道订单 => 详情
 * @param {*}
 * @return: channelDetail
 */

export function channelDetail(parameter: any) {
  return axios({
    method: 'get',
    url: api.channelDetail,
    params: parameter
  })
}

/**
 * @description: 渠道部门 => 渠道订单 => 详情
 * @param {*}
 * @return: orderDetail
 */

export function orderDetail(parameter: any) {
  return axios({
    method: 'get',
    url: api.orderDetail,
    params: parameter
  })
}

/**
 * @description: 渠道部门 => 渠道审核 => 审核
 * @param {*}
 * @return: confirmOrder
 */

export function confirmOrder(parameter: any) {
  return axios({
    method: 'get',
    url: api.confirmOrder,
    params: parameter
  })
}
