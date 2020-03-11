import { axios } from '@/utils/request'
import qs from 'qs'
import { Api } from '../types/api'

/**
 * @description: 用户信息 API
 * @param {Object} login [登录]
 * @return: api
 * @author yylong 2020/03/09
 */

const api: Api = {
  login: '/api/gologin'
}


/**
 * @description: 登录
 * @param {Object} parameter [用户名 | 密码]
 * @return: Login
 */

export function Login(parameter: any) {
  return axios({
    method: 'get',
    url: api.login,
    data: qs.stringify(parameter)
  })
}

