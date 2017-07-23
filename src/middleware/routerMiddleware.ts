import {
  UPDATE_LOCATION,
  locationUpdated
} from 'reducers/router'

export default function routerMiddleware(history) {
  return ({ dispatch, getState }) => next => action => {
    if (action.type !== UPDATE_LOCATION) {
      return next(action)
    }
    const { redirectTo } = action.payload
    const { pathname } = history.location

    if (redirectTo !== pathname)
      dispatch(() => history.replace(redirectTo))

    dispatch(locationUpdated(redirectTo))
  }
}
