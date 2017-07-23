import { combineReducers } from 'redux'

import auth, {
  RESET,
  RESET_PROCESS,
  AuthInfo
} from './auth'
import shared, { Shared } from './shared'
import router, { Router } from './router'

export interface RootState {
  auth?: AuthInfo,
  shared?: Shared,
  router?: Router,
}

const appReducer = combineReducers<RootState>({
  auth,
  shared,
  router,
})

const rootReducer = (state, action) => {
  if (action.type === RESET) {
    return appReducer({}, action)
  }
  if (action.type === RESET_PROCESS) {
    return appReducer({ auth: state.auth, router: state.router, shared: {operations: state.shared.operations} }, action)
  }
  return appReducer(state, action)
}

export default rootReducer
