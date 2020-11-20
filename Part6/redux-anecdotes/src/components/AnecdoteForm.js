import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const hide = () => dispatch(showNotification(''))
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const addAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(createAnecdote(addAnecdote))
    dispatch(showNotification(`"${content}" created.`))
    setTimeout(hide, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}
export default AnecdoteForm