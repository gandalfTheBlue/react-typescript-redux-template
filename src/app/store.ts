import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import loadingMiddleware from '../middleware/loading'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      // To allow promise as payload for loading middleware
      serializableCheck: false,
    }),
    thunk,
    loadingMiddleware,
  ],
})

export type AppDispatch = typeof store.dispatch

export default store
