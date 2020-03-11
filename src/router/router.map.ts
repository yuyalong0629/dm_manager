import UserLayout from '@/layouts/userLayout/UserLayout'
import BasicLayout from '@/layouts/basicLayout/BasicLayout'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    name: 'user',
    redirect: '/user/login',
    component: UserLayout,
    children: [
      {
        path: '/user/login',
        name: 'login',
        meta: { title: '登录', hidden: true },
        component: () => import('@/views/user/Login')
      }
    ]
  }
]

/**
 * @description: 导航路由
 * @param { *[] }
 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    redirect: '/index/management',
    component: BasicLayout,
    meta: { title: '首页' },
    children: [
      {
        path: '/index/management',
        name: 'management',
        meta: { title: '员工管理', hidden: false },
        component: () => import('@/views/user/Login')
      }
    ]
  }
]
