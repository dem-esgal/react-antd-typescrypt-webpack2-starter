import axios from 'axios'
import { notification } from 'antd'
import { createAction } from 'redux-actions'
export const LOGOUT_DONE = 'LOGOUT_DONE'

export const api = axios.create({
  baseURL: '/api/',
  timeout: 30000,
  responseType: 'json',
})

const configureHeader = () => {
  const sessionUser = sessionStorage.getItem('auth')
  try {
    const json = JSON.parse(sessionUser)
    if (json) {
      return { headers: { etoken: json.sessionId } }
    }
  } catch ( e ) {
    return {}
  }
  return {}
}

const simpleLogout = createAction(LOGOUT_DONE)

const openNotification = (message) => {
  notification.error({
    message: message || '',
    duration: 15000,
    description: '',
  })
}

const request = (url, options) => {
  const types = options.types
  return (dispatch) => {
    dispatch(createAction(types[0])(options.actionParams))
    api.post(url, options.params, configureHeader())
      .then((response) => {
        if (response.data.success) {
          if (options.onSuccess) {
            dispatch(() => options.onSuccess(response.data.data))
          } else {
            dispatch(createAction(types[1])(response.data.data))
          }
        } else {
          if (options.onFailed) {
            dispatch(() => options.onFailed(response.data))
          } else {
            dispatch(createAction(types[2])(response.data))
          }
          dispatch(() => openNotification(response.data.message))
        }
      })
      .catch((response) => {
        dispatch(createAction(types.length > 3 ? types[3] : types[2])(response.data))
        if (response.response && response.response.status === 401) {
          sessionStorage.setItem('auth', '{}')
          dispatch(simpleLogout())
        }
        if (response.response && response.response.status === 504) {
          openNotification('Service is unavailable')
        }
      })
  }
}

export function postData(url, options) {
  return request(url, options)
}
