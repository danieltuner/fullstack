import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_VOTE': {
      const id = action.data.id
      const voteToChange = state.find(n => n.id === id)
      const changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
      return state.map(n =>
        n.id !== id ? n : changedVote )
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

export const newVote = (id) => {
  return {
    type: 'NEW_VOTE',
    data: { id }
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