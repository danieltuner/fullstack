const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      let stateCopy = { ...state}
      stateCopy = action.content
      return stateCopy
    default:
      return state
  }
}

export const filterAnecdotes = (content) => {
  return {
    type: 'SET_FILTER',
    content,
  }
}

export default filterReducer