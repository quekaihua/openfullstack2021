import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
  },
})

let timer
export const setNotification = (notification, delay=5) => {
  return  dispatch => {
    dispatch(set(notification))
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(set(''))
    }, delay*1000)
  }
}

export const { set } = notificationSlice.actions
export default notificationSlice.reducer
