/**
 * Created by womkim on 2017/10/18.
 */

import { combineReducers } from 'redux'
import {
  TOGGLE_SIDER,
  CHANGE_NAVBAR,
  SWITCH_THEME
} from '@/constants/ActionTypes'
import { app } from '@/constants/InitialState'
import { api } from '@/utils/config'

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

const loadMenuList = async () => {
  const response = await fetch(api.getMenu + '?token=123')
  const menus = await response.json()
  if (response.status !== 200) {
    throw Error(menus.message)
  }
  return menus
}

const menuList = (state = app.menuList, action) => {
  return state
}

export default combineReducers({
  siderFold,
  isNavbar,
  darktheme,
  menuList
})
