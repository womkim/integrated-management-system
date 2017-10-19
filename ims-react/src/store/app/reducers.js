/**
 * Created by womkim on 2017/10/18.
 */

import { combineReducers } from 'redux'
import {
  TOGGLE_SIDER,
  CHANGE_NAVBAR,
  SWITCH_THEME,
  LOAD_MENU,
  CHANGE_MENU_OPENID,
  GET_USERINFO
} from './constants'
import { app } from '@/store/init'

const siderFold = (state = app.siderFold, action) => {
  if (action.type === TOGGLE_SIDER) {
    return !state
  }
  return state
}

const isNavbar = (state = app.isNavbar, action) => {
  const isNavbar = window.document.body.clientWidth < 769
  if (action.type === CHANGE_NAVBAR && isNavbar !== state) {
    return isNavbar
  }
  return state
}

const darktheme = (state = app.darktheme, action) => {
  if (action.type === SWITCH_THEME) {
    return !state
  }
  return state
}

const menuList = (state = app.menuList, action) => {
  if (action.type === LOAD_MENU) {
    return action.items
  }
  return state
}

const menuOpenId = (state = app.menuOpenId, action) => {
  if (action.type === CHANGE_MENU_OPENID) {
    return action.id
  }
  return state
}

const userinfo = (state = app.userinfo, action) => {
  if (action.type === GET_USERINFO) {
    return action.userinfo
  }
  return state
}

export default combineReducers({
  siderFold,
  isNavbar,
  darktheme,
  menuList,
  menuOpenId,
  userinfo
})
