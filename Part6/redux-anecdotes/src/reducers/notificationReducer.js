const initialState = ''
let timeoutID = 0

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
            return action.data
      case 'HIDE_NOTIFICATION':
            return ''
      
      default:
          return state
    }
  }
  export const showNotification = (notification, duration)  => {
    return async dispatch => {
      dispatch({
      type: 'SHOW_NOTIFICATION',
      data: notification
    })
    clearTimeout(timeoutID) 
  hideNotification()
  timeoutID = setTimeout(() => {
    dispatch(hideNotification())
    }, duration * 1000)
  }
}
export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}
  
  export default notificationReducer