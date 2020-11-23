const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}
export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    data: user
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export default userReducer