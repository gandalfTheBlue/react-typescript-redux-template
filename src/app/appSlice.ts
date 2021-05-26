import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './rootReducer'
import { createAction } from 'redux-actions'

interface AppState {
  loading: boolean
}

const initialState: AppState = {
  loading: false,
}

export const incrementByAmountAsync = createAction(
  'app/incrementByAmount',
  (databases: any) => fetchCount(2),
  () => ({
    noMask: false,
  })
)

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
    incrementByAmount: (state) => {
      state.loading = false
    },
  },
})

export const { showLoading, hideLoading } = appSlice.actions

export const selectLoading = (state: RootState) => state.app.loading

export default appSlice.reducer

export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 5000)
  )
}
