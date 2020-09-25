import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
      <Part part={props.parts[3].name} exercises={props.parts[3].exercises} />      
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p> {props.part} {props.exercises} </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises + props.parts[3].exercises}</p>
    </div>
  )
}
const Course = ({ course }) => { 
  console.log(course)
  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
        

    ]
  }

  return <Course course={course} />
}


ReactDOM.render(<App />, document.getElementById('root'))