import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const hide = () => dispatch(hideNotification(''))

    const vote = (id, content) => {
      dispatch(newVote(id))
      dispatch(showNotification(`you voted '${content}'`))
      setTimeout(hide, 5000)
    }
    
    const sortAnecdotes = (anecdotes) => {
        return (
          anecdotes.sort((a, b) => b.votes - a.votes)
        )
      }
  
      return (
          <div>
            {sortAnecdotes(anecdotes).map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
              </div>
            )}</div>
      )
  }

export default AnecdoteList