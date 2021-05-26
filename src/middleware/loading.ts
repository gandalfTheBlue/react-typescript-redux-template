// @ts-nocheck
import { hideLoading, showLoading } from '../app/appSlice'

// counter，when thare are multiple requests，merge loading mask.
let maskCount = 0
// delay time under 300ms that users cannot sense it.
const delayTime = 300

let openTimerCount = 0
let openTimer
let closeTimerCount = 0
let closeTimer

function mask(dispatch) {
  if (openTimerCount > 1) {
    clearTimeout(openTimer)
    --openTimerCount
  }
  // Open the loading mask delayed
  // If the request time is short(<= delayTime)，then don't open the loading mask.
  if (++maskCount > 1) return
  ++openTimerCount
  openTimer = setTimeout(() => {
    --openTimerCount
    dispatch(showLoading())
  }, delayTime)
}

function unmask(dispatch) {
  if (closeTimerCount > 0) {
    clearTimeout(closeTimer)
    --closeTimerCount
  }
  // Close the loading mask delayed
  // If two requests with short interval, then merge the loading mask.
  if (--maskCount > 0) return
  ++closeTimerCount
  closeTimer = setTimeout(() => {
    if (maskCount !== 0) return
    --closeTimerCount
    dispatch(hideLoading())
  }, delayTime)
}

export default function loadingMiddleware({ dispatch }) {
  return (next) => (action) => {
    const { payload, meta } = action

    if (isPromise(payload) && !(meta && meta.noMask)) {
      mask(dispatch)
      payload
        .then(
          () => unmask(dispatch),
          () => unmask(dispatch)
        )
        .catch(() => {
          unmask(dispatch)
        })
    }
    return next(action)
  }
}

function isPromise(val) {
  return val && typeof val.then === 'function'
}
