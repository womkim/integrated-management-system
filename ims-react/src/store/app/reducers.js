/**
 * Created by womkim on 2017/10/18.
 */

import { combineReducers } from 'redux'
import {
  TOGGLE_SIDER,
  CHANGE_NAVBAR,
  SWITCH_THEME,
  INVALIDATE_MENU,
  REQUEST_DATA,
  RECEIVE_DATA
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

const fetchState = (state = app.fetchState, action) => {
  switch (action.type) {
    case INVALIDATE_MENU:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DATA:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DATA:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receiveAt
      }
    default:
      return state
  }
}

const menuList = (state = app.menuList, action) => {
  switch (action.type) {
    case INVALIDATE_MENU:
    case REQUEST_DATA:
    case RECEIVE_DATA:
      return fetchState(app.fetchState, action)
    default:
      return state
  }
}

export default combineReducers({
  siderFold,
  isNavbar,
  darktheme,
  menuList
})
