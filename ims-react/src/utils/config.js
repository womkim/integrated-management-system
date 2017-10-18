const API_PREFIX = '/api'

module.exports = {
  name: 'Intergrated MS',
  prefix: 'ims',
  footerText: 'Intergrated Management System  © 2017 womkim',
  logo: '',
  apiPrefix: '/api',
  api: {
    userLogin: `${API_PREFIX}/user/login`,
    userLogout: `${API_PREFIX}/user/logout`,
    userInfo: `${API_PREFIX}/userInfo`,
    users: `${API_PREFIX}/users`,
    posts: `${API_PREFIX}/posts`,
    user: `${API_PREFIX}/user/:id`,
    dashboard: `${API_PREFIX}/dashboard`,
    getMenu: `${API_PREFIX}/getMenu`,
    updateMenuById: `${API_PREFIX}/updateMenuById`,
    saveMenu: `${API_PREFIX}/saveMenu`,
    removeMenuById: `${API_PREFIX}/removeMenuById`,
    v1test: `${API_PREFIX}/test`
  }
}
