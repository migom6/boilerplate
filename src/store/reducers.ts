import { combineReducers } from 'redux'
import { reducer as counterReducer, Action as CounterAction } from './counter'

export const combinedReducers = combineReducers({
  counterReducer: counterReducer,
})

export type RootState = ReturnType<typeof combinedReducers>
export type RootAction = CounterAction
