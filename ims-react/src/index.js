/**
 * Created by womkim on 2017/10/18.
 */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from '@/store'
import Router from '@/router'

import 'antd/dist/antd.css'

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)
