import Redux from 'redux'

interface Action<TPayload> extends Redux.Action {
  payload: TPayload
  type: string
}

export interface ReduxAction extends Action<any> {}

export const UNDEFINED_ACTION: ReduxAction = {
  type: undefined,
  payload: undefined
}
