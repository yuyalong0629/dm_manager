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
    redirect: '/index/rank',
    component: BasicLayout,
    meta: { title: '首页' },
    children: [
      {
        path: '/index/rank',
        name: 'rank',
        meta: { title: ['员工管理', '龙虎榜'], hidden: false },
        component: () => import('@/views/rank/Rank')
      },
      {
        path: '/index/management',
        name: 'management',
        meta: { title: ['员工管理', '员工分类'], hidden: false },
        component: () => import('@/views/management/Management.vue')
      },
      {
        path: '/index/information',
        name: 'information',
        meta: { title: ['员工管理', '员工信息'], hidden: false },
        component: () => import('@/views/information/Information.vue')
      },
      {
        path: '/index/customerInfo',
        name: 'customerInfo',
        meta: { title: ['销售部门', '客户信息'], hidden: false },
        component: () => import('@/views/customerInfo/CustomerInfo.vue')
      },
      {
        path: '/index/customerPublicBank',
        name: 'customerPublicBank',
        meta: { title: ['销售部门', '客户公库'], hidden: false },
        component: () => import('@/views/customerPublicBank/CustomerPublicBank.vue')
      },
      {
        path: '/index/customerAccounts',
        name: 'customerAccounts',
        meta: { title: ['销售部门', '销售公众号'], hidden: false },
        component: () => import('@/views/customerAccounts/CustomerAccounts.vue')
      },
      {
        path: '/index/customerTok',
        name: 'customerTok',
        meta: { title: ['销售部门', '销售抖音'], hidden: false },
        component: () => import('@/views/customerTok/CustomerAccounts.vue')
      },
      {
        path: '/index/customerBilibili',
        name: 'customerBilibili',
        meta: { title: ['销售部门', '销售B站'], hidden: false },
        component: () => import('@/views/customerBilibili/CustomerAccounts.vue')
      },
      {
        path: '/index/customerMeipai',
        name: 'customerMeipai',
        meta: { title: ['销售部门', '销售B站签约号'], hidden: false },
        component: () => import('@/views/customerMeipai/CustomerAccounts.vue')
      },
      {
        path: '/index/customerDeftHand',
        name: 'customerDeftHand',
        meta: { title: ['销售部门', '销售快手'], hidden: false },
        component: () => import('@/views/customerDeftHand/CustomerAccounts.vue')
      },
      {
        path: '/index/customerSina',
        name: 'customerSina',
        meta: { title: ['销售部门', '销售微博'], hidden: false },
        component: () => import('@/views/customerSina/CustomerAccounts.vue')
      },
      {
        path: '/index/customerRedbook',
        name: 'customerRedbook',
        meta: { title: ['销售部门', '销售小红书'], hidden: false },
        component: () => import('@/views/customerRedbook/CustomerAccounts.vue')
      },
      {
        path: '/index/customerLive',
        name: 'customerLive',
        meta: { title: ['销售部门', '销售直播'], hidden: false },
        component: () => import('@/views/customerLive/CustomerAccounts.vue')
      },
      {
        path: '/index/channelAccounts',
        name: 'channelAccounts',
        meta: { title: ['渠道部门', '渠道公众号'], hidden: false },
        component: () => import('@/views/channelAccounts/ChannelAccounts.vue')
      },
      {
        path: '/index/channelTok',
        name: 'channelTok',
        meta: { title: ['渠道部门', '渠道抖音'], hidden: false },
        component: () => import('@/views/channelTok/ChannelAccounts.vue')
      },
      {
        path: '/index/channelBilibili',
        name: 'channelBilibili',
        meta: { title: ['渠道部门', '渠道B站'], hidden: false },
        component: () => import('@/views/channelBilibili/ChannelAccounts.vue')
      },
      {
        path: '/index/channelMeipai',
        name: 'channelMeipai',
        meta: { title: ['渠道部门', '渠道B站签约号'], hidden: false },
        component: () => import('@/views/channelMeipai/ChannelAccounts.vue')
      },
      {
        path: '/index/channelDeftHand',
        name: 'channelDeftHand',
        meta: { title: ['渠道部门', '渠道快手'], hidden: false },
        component: () => import('@/views/channelDeftHand/ChannelAccounts.vue')
      },
      {
        path: '/index/channelSina',
        name: 'channelSina',
        meta: { title: ['渠道部门', '渠道微博'], hidden: false },
        component: () => import('@/views/channelSina/ChannelAccounts.vue')
      },
      {
        path: '/index/channelRedbook',
        name: 'channelRedbook',
        meta: { title: ['渠道部门', '渠道小红书'], hidden: false },
        component: () => import('@/views/channelRedbook/ChannelAccounts.vue')
      },
      {
        path: '/index/channelLive',
        name: 'channelLive',
        meta: { title: ['渠道部门', '渠道直播'], hidden: false },
        component: () => import('@/views/channelLive/ChannelAccounts.vue')
      },
      {
        path: '/index/channelSearch',
        name: 'channelSearch',
        meta: { title: ['渠道部门', '渠道查询'], hidden: false },
        component: () => import('@/views/channelSearch/ChannelSearch.vue')
      },
      {
        path: '/index/channelOrder',
        name: 'channelOrder',
        meta: { title: ['渠道部门', '渠道订单'], hidden: false },
        component: () => import('@/views/channelOrder/ChannelOrder.vue')
      }
    ]
  }
]
