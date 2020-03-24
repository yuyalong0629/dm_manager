import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { VueAxios } from './axios'
import { message } from 'ant-design-vue'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 10000 // 请求超时时间
})

const err = (error: any): any => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      ; (message as any).error(data.message)
    }
    if (error.response.status === 401) {
      ; (message as any).error(data.message)
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  if (response.data.code === 0) {
    window.localStorage.clear()
    router.replace({ path: '/user/login' })
  }
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue: any) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }
