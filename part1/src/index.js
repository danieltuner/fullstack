import React from 'react'
import ReactDOM from 'react-dom'

const Hello = ({ name, age }) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - age
  }
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
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