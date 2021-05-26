import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './rootReducer'

interface AppState {
  loading: boolean
}

const initialState: AppState = {
  loading: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true
    },
    hideLoading: (state) => {
      state.loading = false
    },
  },
})

export const { showLoading, hideLoading } = appSlice.actions

export const selectLoading = (state: RootState) => state.app.loading

export default appSlice.reducer
