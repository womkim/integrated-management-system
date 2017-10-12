import Vue from 'vue'
import Router from 'vue-router'

// import SettingMenu from '@/pages/SettingMenu/SettingMenu'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [{
    name: 'SettingMenu',
    path: '/setting-menu',
    component: resolve => require(['../pages/SettingMenu/SettingMenu.vue'], resolve) // 懒加载
  }]
})
