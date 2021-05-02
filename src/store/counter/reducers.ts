import { Action } from './actions'
import constants from './constants'

const initialState = {
  count: 0,
}

export type StateType = typeof initialState

export const reducer = (state = initialState, action: Action): StateType => {
  switch (action.type) {
    case constants.ADD:
      return { ...state, count: state.count + action.payload.value }
    default:
      return state
  }
}
