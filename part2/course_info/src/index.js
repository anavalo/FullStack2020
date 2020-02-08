import React from 'react'
import ReactDOM from 'react-dom'

const Course =(props)=>{
    const {course} = props
    
    const Content = (props) =>{
      const {parts} = props
      return (
        <li>{parts.name} {parts.exercises}</li>
      )
    }
    const Header = (props)=>{
      const {course} = props
      return(
          <h1>{course.name}</h1>
      )
  }
    const courserows = () => course.parts.map(part =>{
      return(
      <Content
        key={part.id}
        parts={part}/> )})

      const stats = () => course.parts.reduce((num, numOfEx)=>{
          return num + numOfEx.exercises
      }, 0)

    return(<>
      <div><Header course={course}/> </div>
      <div>{courserows()}</div>
      <div>Total excercieses {stats()}</div>
      </>
    )
}


const App = () => {

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

  return (
      <div><Course course={course}/></div>  
  )}

ReactDOM.render(<App />, document.getElementById('root'))
