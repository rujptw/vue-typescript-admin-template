/*
 * @Date: 2020-12-16 10:09:44
 * @LastEditors: sam
 * @LastEditTime: 2020-12-16 14:25:38
 * @FilePath: /monitor/vue-typescript-admin-template/src/router.ts
 */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: { hidden: true }
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
      meta: { hidden: true }
    },
    {
      path: '/',
      component: Layout,
      redirect: '/user',
      children: [
        {
          path: 'user',
          component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue'),
          meta: {
            title: '用户',
            icon: 'user'
          }
        },
        {
          path: 'middleware',
          component: () => import(/* webpackChunkName: "middleware" */ '@/views/middleware/index.vue'),
          meta: {
            title: '中间件',
            icon: 'tree'
          }
        },
        {
          path: 'dataBase',
          component: () => import(/* webpackChunkName: "middleware" */ '@/views/dataBase/index.vue'),
          meta: {
            title: '数据库',
            icon: 'tree'
          }
        },
        {
          path: 'application',
          component: () => import(/* webpackChunkName: "application" */ '@/views/application/index.vue'),
          meta: {
            title: '应用',
            icon: 'tree'
          }
        },
        {
          path: 'probe',
          component: () => import(/* webpackChunkName: "probe" */ '@/views/probe/index.vue'),
          meta: {
            title: '探测',
            icon: 'tree'
          }
        },
        {
          path: 'monitor',
          component: () => import(/* webpackChunkName: "probe" */ '@/views/monitor/index.vue'),
          meta: {
            title: '监控',
            icon: 'tree'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
})
