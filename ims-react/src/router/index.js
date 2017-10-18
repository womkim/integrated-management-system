/**
 * Created by womkim on 2017/10/18.
 */

import React from 'react'
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Home from '@/pages/Home/Home'

const history = createBrowserHistory()
const supportsHistory = 'pushState' in window.history

const route = () => <Router history={history} forceRefresh={!supportsHistory}>
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
</Router>

export default route
