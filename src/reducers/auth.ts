import * as _ from 'lodash'
import { createAction } from 'redux-actions'

import api from 'services/api'
import { UserInfo } from 'interfaces/dto/UserInfo.interface'
import {
  ReduxAction,
  UNDEFINED_ACTION
} from 'interfaces/ReduxAction.interface'

import { history } from 'utils/History'
import { LOGOUT_DONE } from 'utils/FetchData'

const ADMIN_ROLE = '1'

/* Actions */
const LOGIN_REQUEST_PENDING: string = 'auth/LOGIN_REQUEST_PENDING'
const LOGIN_REQUEST_DONE: string = 'auth/LOGIN_REQUEST_DONE'
const LOGIN_REQUEST_VERIFICATION_FAILED: string = 'auth/LOGIN_REQUEST_VERIFICATION_FAILED'
const LOGIN_REQUEST_ERROR: string = 'auth/LOGIN_REQUEST_ERROR'
const LOGOUT_PENDING: string = 'auth/LOGOUT_PENDING'

export const RESET: string = 'auth/RESET'
export const RESET_PROCESS: string = 'auth/RESET_PROCESS'

const RESTORED: string = 'auth/RESTORED'

export interface AuthInfo {
  loading: boolean,
  loggedIn: boolean,
  error: boolean,
  user: UserInfo,
}

const initialState: AuthInfo = {
  loading: false,
  loggedIn: false,
  error: false,
  user: null,
}

export default (state: AuthInfo = initialState, action: ReduxAction = UNDEFINED_ACTION) => {
  switch (action.type) {
    case LOGIN_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_REQUEST_DONE:
      return {
        ...state,
        error: null,
        loading: false,
        loggedIn: true,
        user: action.payload,
      }
    case LOGIN_REQUEST_VERIFICATION_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        loggedIn: false,
      }
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        loggedIn: false,
      }
    case LOGOUT_DONE:
      return {
        ...state,
        loggedIn: false,
      }
    case RESTORED:
      return {
        ...state,
        loggedIn: !_.isEmpty(action.payload),
        user: action.payload,
      }
    default:
      return state
  }
}

export const restored = createAction(RESTORED)

export function resetState() {
  return (dispatch) => {
    dispatch(createAction(RESET)())
  }
}

export function resetProcess() {
  return (dispatch) => {
    dispatch(createAction(RESET_PROCESS)())
  }
}

export function login(payload: any) {
  return (dispatch: Function) => {
    const options = {
      types: [LOGIN_REQUEST_PENDING, LOGIN_REQUEST_DONE, LOGIN_REQUEST_VERIFICATION_FAILED,
        LOGIN_REQUEST_ERROR],
      actionParams: payload,
      params: payload,
      onSuccess: (result) => {
        sessionStorage.setItem('auth', JSON.stringify(result));
        if (result.roleId === ADMIN_ROLE) {
          dispatch(() => {
            history.push('/')
          })
        }
        dispatch(createAction(LOGIN_REQUEST_DONE)(result))
      },
    }
    dispatch(api.auth.login(options))
  }
}

export function logout(payload = {}) {
  return (dispatch) => {
    const options = {
      types: [LOGOUT_PENDING, LOGOUT_DONE, LOGOUT_DONE],
      actionParams: payload,
      params: payload,
    }
    dispatch(resetState())
    sessionStorage.setItem('auth', '{}')
    dispatch(api.auth.logout(options))
  }
}

export function restore() {
  return (dispatch) => {
    const sessionUser = sessionStorage.getItem('auth')
    try {
      const json = JSON.parse(sessionUser)
      if (json) {
        dispatch(restored(json))
      }
    } catch ( e ) {
      dispatch({ type: LOGOUT_DONE })
    }
  }
}
