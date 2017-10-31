/**
 * Created by womkim on 2017/10/18.
 */

import {
  TOGGLE_SIDER,
  CHANGE_NAVBAR,
  SWITCH_THEME,
  LOAD_MENU,
  CHANGE_MENU_OPENID,
  GET_USERINFO
} from './constants'
import { api } from '@/utils/config'
import { arrayToTree } from '@/utils/util'

export const toggleSider = () => ({
  type: TOGGLE_SIDER
})

export const changeNavbar = () => ({
  type: CHANGE_NAVBAR
})

export const switchTheme = () => ({
  type: SWITCH_THEME
})

export const loadMenu = items => ({
  type: LOAD_MENU,
  items: items
})

export const changeMenuOpenId = id => ({
  type: CHANGE_MENU_OPENID,
  id
})

export const loadUser = (userinfo) => ({
  type: GET_USERINFO,
  userinfo
})

// 异步获取数据，return a function
export const loadMenuList = () => dispatch => {
  console.log('loadding menu list...')
  return fetch(api.getMenu + '?token=123')
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        const result = arrayToTree(data.data, '_id')
        dispatch(loadMenu(result))
      } else {
        console.error(`request error: ${data.message}`)
      }
    })
    .catch(e => console.error(`an error occured when loadding menu list: ${e.message}`))
}

export const loadUserinfo = () => dispatch => {
  console.log('loadding userinfo..')
  return fetch(api.showUsers + '?token=123')
    .then(response => response.json())
    .then(data => {
      dispatch(loadUser({username: 'womkim'}))
    })
    .catch(e => console.error(`an error occured when loadding user info: ${e.message}`))
}
