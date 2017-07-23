import {
  createStore,
  applyMiddleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'

import { history } from 'utils/History'
import routerMiddleware from 'middleware/routerMiddleware'

import rootReducer from 'reducers'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(history)
)(createStore)

export default function configureStore(initialState?: Object) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
