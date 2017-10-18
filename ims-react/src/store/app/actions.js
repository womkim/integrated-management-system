/**
 * Created by womkim on 2017/10/18.
 */

import {
  TOGGLE_SIDER,
  CHANGE_NAVBAR,
  SWITCH_THEME,
  INVALIDATE_MENU,
  REQUEST_DATA,
  RECEIVE_DATA
} from './constants'
import { api } from '@/utils/config'

export const toggleSider = () => ({
  type: TOGGLE_SIDER
})

export const changeNavbar = () => ({
  type: CHANGE_NAVBAR
})

export const switchTheme = () => ({
  type: SWITCH_THEME
})

export const invalidateMenu = () => ({
  type: INVALIDATE_MENU
})

export const requestData = () => ({
  type: REQUEST_DATA
})

export const receiveData = items => ({
  type: RECEIVE_DATA,
  items: items.data,
  receiveAt: Date.now()
})

const loadMenuList = async (dispatch) => {
  const response = await fetch(api.getMenu + '?token=123')
  const menus = await response.json()
  if (response.status !== 200) {
    throw Error(menus.message)
  }
  dispatch(receiveData(menus))
  return menus
}

const fetchData = () => dispatch => {
  dispatch(requestData())
  return loadMenuList()
}

const shouldFetchingData = (state, post) => {
  if (post) {
    return post
  }
  return false
}

export const fetchDataIfNeeded = (post) => (dispatch, getState) => {
  if (shouldFetchingData(getState, post)) {
    return dispatch(fetchData())
  }
}
