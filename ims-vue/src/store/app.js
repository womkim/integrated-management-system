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
    ],
    iviewIcons: [ 'alert',
      'android-checkbox-outline',
      'android-color-palette',
      'android-more-vertical',
      'android-remove',
      'arrow-down-b',
      'at',
      'chatbox-working',
      'chatbubble-working',
      'email-unread',
      'ios-albums-outline',
      'ios-arrow-down',
      'ios-arrow-right',
      'ios-arrow-up',
      'ios-bell-outline',
      'ios-book-outline',
      'ios-browsers-outline',
      'ios-calculator',
      'ios-calendar-outline',
      'ios-chatbubble-outline',
      'ios-checkmark-outline',
      'ios-circle-filled',
      'ios-circle-outline',
      'ios-clock-outline',
      'ios-cloud-upload-outline',
      'ios-compose-outline',
      'ios-film-outline',
      'ios-grid-view',
      'ios-grid-view-outline',
      'ios-heart-outline',
      'ios-information-outline',
      'ios-list-outline',
      'ios-list-outline',
      'ios-minus-empty',
      'ios-more',
      'ios-more-outline',
      'ios-pause-outline',
      'ios-pricetags-outline',
      'ios-star',
      'load-d',
      'minus-round',
      'navicon-round',
      'network',
      'person',
      'pin',
      'social-windows-outline',
      'social-youtube-outline',
      'toggle' ]
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
