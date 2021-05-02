import { action, ActionType } from 'typesafe-actions'
import Constants from './constants'
export const add = (
  value: number
): {
  type: Constants.ADD
  payload: {
    value: number
  }
} => action(Constants.ADD, { value })

export type Action = ActionType<typeof add>
