import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  return (
    <table>
      <thead>
      <tr>
        <td>good</td><td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td><td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td><td>{bad}</td>
      </tr>
      <tr>
        <td>all</td><td>{good + neutral + bad}</td>
      </tr>
      <tr>
        <td>avarage</td><td>{(good - bad) / (good + neutral + bad)}</td>
      </tr>
      <tr>
        <td>positive</td><td>{(good/(good + neutral + bad) * 100)} %</td>
      </tr>
      </thead>
    </table>
  )
}
const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Buttons = ({increaseByOneGood, increaseByOneNeutral, increaseByOneBad}) => {
  return (
    <div>
      <Button handleClick={increaseByOneGood} text='good' />
      <Button handleClick={increaseByOneNeutral} text='neutral' />
      <Button handleClick={increaseByOneBad} text='bad' />
    </div>
  )
}

const Statistic = ({text, value, text1}) => (<Display text={text} value={value} text1={text1}/>)

const Display = (props) => {
  return (
  <div>{props.text} {props.value} {props.text1}</div>
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

  const statistics = <Statistics good={good} neutral={neutral} bad={bad} />
  const buttons = <Buttons increaseByOneGood={increaseByOneGood} increaseByOneNeutral={increaseByOneNeutral} increaseByOneBad={increaseByOneBad}/>
  
if (good + neutral + bad === 0)
  return (
    <div>      
        <h1>give feedback</h1>
        <>{buttons}</>
        <h1>statistics</h1>
        <p>No feedback given</p>
    </div>
  )
     
  return (
    <div>
      <h1>give feedback</h1>
      <>{buttons}</>
      <h1>statistics</h1>
      <>{statistics}</>      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
