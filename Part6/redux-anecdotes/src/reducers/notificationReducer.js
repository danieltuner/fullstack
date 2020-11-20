const initialState = ''
let timeoutID = undefined

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
            return action.data
      
      default:
          return state
    }
  }
  export const showNotification = (notification, duration)  => {
    return async dispatch => {
      dispatch({
      type: 'SHOW_NOTIFICATION',
      data: notification,
    })
    clearTimeout(timeoutID) 
  hideNotification()
  timeoutID = setTimeout(() => {
    dispatch(hideNotification())
    timeoutID = undefined
    }, duration * 1000)
  }
}
export const hideNotification = (notification) => {
  return {
    type: 'HIDE_NOTIFICATION',
    notification
  }
}
  
  export default notificationReducer