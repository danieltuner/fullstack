import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </div>
  )
}
const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://https://github.com/danieltuner">danieltuner</a>
    </div>
  )
}





ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
)