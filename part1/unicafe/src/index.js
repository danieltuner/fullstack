import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  return (
    <div>
      <p>{props.text} {props.value} {props.text1}</p>
    </div>
  )
}

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
if (good + neutral + bad === 0)
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
        <p>No feedback given</p>
    </div>
  )
     
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
      <Statistics text='good' value={good} />
      <Statistics text='neutral' value={neutral} />
      <Statistics text='bad' value={bad} />
      <Statistics text='all' value={good + neutral + bad} />
      <Statistics text='avarage' value={(good - bad) / (good + neutral + bad)} />
      <Statistics text='positive' value={(good/(good + neutral + bad) * 100)} text1='%' />
      

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
