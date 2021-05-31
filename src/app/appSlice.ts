import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginForm, User } from '../models/appModel';
import appService from '../service/appService';
import { RootState } from './rootReducer';

interface AppState {
  loading: boolean;
  user?: User;
}

const initialState: AppState = {
  loading: false,
};

export const userLogin = createAsyncThunk(
  'app/userLogin',
  (loginForm: LoginForm) => appService.login(loginForm)
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      userLogin.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.user = payload;
      }
    );
  },
});

export const { showLoading, hideLoading } = appSlice.actions;

export const selectLoading = (state: RootState) => state.app.loading;
export const selectUser = (state: RootState) => state.app.user;

export default appSlice.reducer;
