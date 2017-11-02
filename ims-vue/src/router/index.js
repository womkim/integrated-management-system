import Vue from 'vue'
import Router from 'vue-router'

// import SettingMenu from '@/pages/SettingMenu/SettingMenu'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [{
    name: 'index',
    path: '/',
    redirect: '/dashboard'
  }, {
    name: 'SettingMenu',
    path: '/setting-menu',
    // component: resolve => require(['../pages/SettingMenu/SettingMenu.vue'], resolve) // 懒加载
    component: () => import('@/pages/SettingMenu'),
    children: []
  }, {
    path: '/setting-menu/:action/:id',
    component: () => import('@/pages/SettingMenu/MenuItem')
  }, {
    path: '/dashboard',
    component: () => import('@/pages/Dashboard')
  }, {
    name: 'NotFound',
    path: '*',
    component: () => import('@/pages/NotFound/NotFound')
  }]
})
