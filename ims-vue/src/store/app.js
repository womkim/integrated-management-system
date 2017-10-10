export default {
  state: {
    isNavbar: window.document.body.clientWidth < 769,
    siderFold: false
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
    }
  },
  actions: {
    initial ({ commit }) {
      let tid
      window.onresize = function () {
        clearTimeout(tid)
        tid = setTimeout(() => {
          commit('changeNavbar')
        }, 200)
      }
    },
    switchSiderAsync ({ commit }) {
      setTimeout(() => {
        commit('switchSider')
      }, 200)
    }
  }
}
