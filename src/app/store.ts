import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from '@reduxjs/toolkit';

import loadingMiddleware from '../middleware/loading';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), loadingMiddleware],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
