/**
 * Created by womkim on 2017/10/18.
 */

export const app = {
  siderFold: false,
  isNavbar: window.document.body.clientWidth < 769,
  darktheme: true,
  username: '',
  fetchState: {
    isFetching: false,
    didInvalidate: false,
    items: [],
    lastUpdated: Date.now()
  },
  menuList: [],
  menuOpenId: ''
}
