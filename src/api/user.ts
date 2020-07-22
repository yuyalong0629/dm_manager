import { axios } from '@/utils/request'
import qs from 'qs'
import { Api, Login } from '../types/api'

/**
 * @description: 用户信息 API
 * @param {Object} login [登录]
 * @return: api
 * @author yylong 2020/03/09
 */

const api: Api = {
  login: '/api/login',
  logout: '/api/logout',
  menu: '/api/index',
  updatePwd: '/api/updatePwd'
}

/**
 * @description: 登录
 * @param {string} username [用户名]
 * @param {string} password [密码]
 * @return: Login
 */

export function Login(parameter: Login) {
  return axios({
    method: 'post',
    url: api.login,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 修改密码
 * @return: updatePwd
 */

export function updatePwd(parameter: any) {
  return axios({
    method: 'post',
    url: api.updatePwd,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 退出登录
 * @param {*}
 * @return: Logout
 */

export function Logout() {
  return axios({
    method: 'get',
    url: api.logout
  })
}

/**
 * @description: 权限菜单
 * @param {*}
 * @return: menu
 */

export function menu() {
  return axios({
    method: 'get',
    url: api.menu
  })
}
