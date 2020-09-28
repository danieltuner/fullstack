import React from 'react'


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

export default Course