import { handleActions } from 'redux-actions'

import { AppActions } from './actions'
import { AppState } from './types'

const initState: AppState = {
  loading: false,
}

const appReducer = handleActions<AppState>(
  {
    [AppActions.SHOW_LOADING]: (state) => {
      return {
        ...state,
        loading: true,
      }
    },
    [AppActions.CLOSE_LOADING]: (state) => {
      return {
        ...state,
        loading: false,
      }
    },
  },
  initState
)

export default appReducer
