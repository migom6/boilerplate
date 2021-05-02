import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { combinedReducers } from './reducers'
import type { RootState, RootAction } from './reducers'

import { HYDRATE, createWrapper } from 'next-redux-wrapper'

// const sagaMiddleware = createSagaMiddleware()

interface hydrateAction {
  type: typeof HYDRATE
  payload: RootState
}

const reducer = (state: RootState, action: RootAction | hydrateAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducers(state, action)
  }
}

export function configureStore(initialState?: RootState): any {
  const store = createStore(reducer as any, initialState, composeWithDevTools())
  // sagaMiddleware.run(rootSaga)
  return store
}
export const wrapper = createWrapper(configureStore as any)
