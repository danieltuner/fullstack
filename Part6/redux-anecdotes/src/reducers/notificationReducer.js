const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
        let stateCopy = { ...state}
            stateCopy = action.notification
            return stateCopy
      
      default:
          return state
    }
  }
  export const showNotification = notification  => {
    return {
      type: 'SHOW_NOTIFICATION',
      notification,
    }
  }
  
  export default notificationReducer