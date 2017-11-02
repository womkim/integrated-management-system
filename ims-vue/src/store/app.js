import config from '../config'
import axios from 'axios'
// import _ from 'lodash'
import { arrayToTree } from '@/assets/js/utils'

export default {
  state: {
    isNavbar: window.document.body.clientWidth < 769,
    mainContainerWidth: window.document.body.clientWidth,
    siderFold: false,
    darktheme: true,
    username: 'womkim',
    logo: config.logo,
    name: config.name,
    menuList: [],
    menuOpenId: '',
    icons: [
      'icon-folder-open',
      'icon-folder-close',
      'icon-file',
      'icon-arrow-down',
      'icon-user',
      'icon-barchart',
      'icon-chartline',
      'icon-chart',
      'icon-bulb',
      'icon-search',
      'icon-edit',
      'icon-camera',
      'icon-home',
      'icon-cart',
      'icon-setting',
      'icon-lab',
      'icon-bars',
      'icon-menufold',
      'icon-menuunfold'
    ]
  },
  mutations: {
    switchSider (state) {
      state.siderFold = !state.siderFold
    },
    changeNavbar (state) {
      const isNavbar = window.document.body.clientWidth < 769
      if (isNavbar !== state.isNavbar) {
        state.isNavbar = isNavbar
      }
    },
    switchTheme (state) {
      state.darktheme = !state.darktheme
    },
    toggleMenu (state, id) {
      state.menuOpenId = id === state.menuOpenId ? '' : id
    },
    computeContainerWidth (state) {
      state.mainContainerWidth = window.document.body.clientWidth
    }
  },
  actions: {
    initial ({ commit }) {
      // let tid
      window.onresize = function () {
        // clearTimeout(tid)
        // tid = setTimeout(() => {
        //   commit('changeNavbar')
        //   commit('computeContainerWidth')
        // }, 200)
        commit('changeNavbar')
        commit('computeContainerWidth')
      }
    },
    switchSiderAsync ({ commit }) {
      setTimeout(() => {
        commit('switchSider')
      }, 200)
    },
    loadMenuList ({ state }) {
      axios('/api/getMenu', {
        method: 'get',
        params: {
          token: '123'
        }
      }).then(data => {
        const details = data.data.data
        details.sort((a, b) => a.order - b.order)
        console.log(details)
        const result = arrayToTree(details, '_id')
        console.log(result)
        state.menuList = result
      }).catch(e => { console.log(`-> error: ${e.message}`) })
    }
  }
}
