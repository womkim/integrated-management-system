/**
 * Created by womkim on 2017/10/18.
 */

import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'

import app from './app/reducers'

const reducer = combineReducers({
  app
})

const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)))

export default store
