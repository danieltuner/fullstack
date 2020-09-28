import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}
const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(course => 
        <Part key={course.id} name={course.name} exercises={course.exercises} />)}   
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p> {props.name} {props.exercises} </p>
    </div>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((sum, part) => {
    console.log('this happens', sum, part)
    return sum + part.exercises
  }, 0)
  return (<p><b> total of {total} exercises</b></p>)
   
}
const Course = ({ course }) => { 
  console.log(course)
  return (
    <div>
    <Header course={course} />
    <Content course={course}/>
    <Total course={course} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(note =>
        <Course key={note.id} course={note} />)}
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))