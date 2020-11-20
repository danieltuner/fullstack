import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_VOTE': {
      const updatedAnecdote = action.data
      return state.map(n => n.id !== updatedAnecdote.id ? n : updatedAnecdote)
    }
    case 'INITIALIZE_ANECDOTES': 
      return action.data
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    default:
      return state
  }
}

export const newVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
      dispatch({
        type: 'NEW_VOTE',
        data: updatedAnecdote
      })
    }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INITIALIZE_ANECDOTES',
    data: anecdotes
  })
}
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote
  })
}
}

export default reducer