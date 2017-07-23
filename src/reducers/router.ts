import { createAction } from 'redux-actions'

import {
  ReduxAction,
  UNDEFINED_ACTION
} from 'interfaces/ReduxAction.interface'

export const UPDATE_LOCATION: string = 'router/UPDATE_LOCATION'
export const SYNC_LOCATION: string = 'router/SYNC_LOCATION'
export const LOCATION_UPDATED: string = 'router/LOCATION_UPDATED'

export const updateLocation = (location: string) => createAction(UPDATE_LOCATION)({ redirectTo: location })
export const locationUpdated = (page: string) => createAction(LOCATION_UPDATED)(page)

export interface Router {
  redirectTo: string | undefined,
  currentPage: string,
}

const initialState: Router = {
  redirectTo: undefined,
  currentPage: '/',
}

export default function router(state: Router = initialState, action: ReduxAction = UNDEFINED_ACTION) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        redirectTo: action.payload.redirectTo,
      }
    case LOCATION_UPDATED:
      return {
        ...state,
        redirectTo: undefined,
        currentPage: action.payload
      }
    default:
      return state
  }
}

export const syncLocation = (pathname: string) => {
  return (dispatch: Function, getState: Function) => {
    if (pathname !== getState().router.currentPage) {
      dispatch(locationUpdated(pathname))
    }
  }
}
