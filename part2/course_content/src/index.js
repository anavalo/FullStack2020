import React from 'react'
import ReactDOM from 'react-dom'

const course = {
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
      name: 'Python',
      exercises: 25,
      id: 4
    }
  ]}

const Course = (props) =>{
  const {parts} = props
  return (
    <li>{parts.name} {parts.exercises}</li>
  )
}

const App = (props) => {
  const {course} = props
 
  const courserows = () => course.parts.map(part =>{
      return(
      <Course
        key={part.id}
        parts={part}/> )})

  return (
    <div>
    <h1>{course.name}</h1>
    <div>
      {courserows()}
    </div></div>
  )
  }

ReactDOM.render(<App course={course}/>, document.getElementById('root'))
