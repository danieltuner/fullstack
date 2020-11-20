import React from 'react'
import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
      props.newVote(anecdote)
      props.showNotification(`you voted '${anecdote.content}'`, 5)
    }
    
    const sortAnecdotes = (anecdotes) => {
        return (
          anecdotes.sort((a, b) => b.votes - a.votes)
        )
      }

    const filterAnecdotes = (filter, anecdotes) => {
      const filteredAnecdotes = anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
      return filteredAnecdotes
    }
  
      return (
          <div>
            {sortAnecdotes(filterAnecdotes(props.filter, props.anecdotes)).map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
                </div>
              </div>
            )}</div>
      )
  }

  const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
    }
  }
  const mapDispatchToProps = {
    newVote, showNotification
  }
  
  const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
  
  export default ConnectedAnecdotes 