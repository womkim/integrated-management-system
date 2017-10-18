/**
 * Created by womkim on 2017/10/18.
 */

import {
  TOGGLE_SIDER,
  CHANGE_NAVBAR,
  SWITCH_THEME
} from '@/constants/ActionTypes'

export const toggleSider = () => ({
  type: TOGGLE_SIDER
})

export const changeNavbar = () => ({
  type: CHANGE_NAVBAR
})

export const switchTheme = () => ({
  type: SWITCH_THEME
})
