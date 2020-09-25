import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  
  const random = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const [points, addPoints] = useState(new Array(7).join('0').split('').map(parseFloat))
  const increaseByOne = () => {const copy = [...points]
  copy[selected] += 1
  addPoints(copy)
  }
  const highestVote = points.indexOf(Math.max.apply(null, points))
  


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={increaseByOne} text='vote'/>
      <Button handleClick={random} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[highestVote]}</p>
      <p>has {points[highestVote]} votes</p>
    </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)