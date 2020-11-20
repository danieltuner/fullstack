const initialState = ''

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
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, duration * 1000)
  }
}
  
  export default notificationReducer