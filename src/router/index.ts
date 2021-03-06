import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { constantRouterMap, asyncRouterMap } from './router.map'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// hack router push callback
const originalPush = (VueRouter as any).prototype.push;
(VueRouter as any).prototype.push = function push(location: any, onResolve?: any, onReject?: any): any {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch((err: any) => err)
  }
}

Vue.use(VueRouter)

const routes = [
  ...constantRouterMap,
  ...asyncRouterMap
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
})

const whiteList = ['login'] // no redirect whitelist
const defaultRoutePath = '/index/rank'

router.beforeEach((to: any, from, next) => {
  NProgress.start() // start progress bar
  if (Vue.ls.get('USER_INFO')) {
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      console.log(defaultRoutePath)
      NProgress.done()
    } else {
      const userInfo = store.getters.GET_STORAGE
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
