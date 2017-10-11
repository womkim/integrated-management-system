const API = '/api'

export default {
  name: 'Intergrated MS',
  prefix: 'ims',
  footerText: 'Intergrated Management System  © 2017 womkim',
  logo: '',
  apiPrefix: '/api',
  api: {
    userLogin: `${API}/user/login`,
    userLogout: `${API}/user/logout`,
    userInfo: `${API}/userInfo`,
    users: `${API}/users`,
    posts: `${API}/posts`,
    user: `${API}/user/:id`,
    dashboard: `${API}/dashboard`,
    menus: `${API}/menus`,
    v1test: `${API}/test`
  }
}
