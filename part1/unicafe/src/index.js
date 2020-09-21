import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOneGood = () => setGood(good + 1)
  const increaseByOneNeutral = () => setNeutral(neutral + 1)
  const increaseByOneBad = () => setBad(bad + 1)

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={increaseByOneGood}
        text='good'
      />
      <Button
        handleClick={increaseByOneNeutral}
        text='neutral'
      />     
      <Button
        handleClick={increaseByOneBad}
        text='bad'
      />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p> 

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
