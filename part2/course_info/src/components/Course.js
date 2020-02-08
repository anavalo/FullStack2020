import React from 'react'

const Course =(props)=>{
    const {courses} = props

    const headerows = ()=> courses.map(uniquecourse =>{
      const courserows = () => uniquecourse.parts.map(part =>{
        return(
        <Content key={part.id} parts={part}/>)})

      const total = () => uniquecourse.parts.reduce((num, numOfEx)=>{
        return num + numOfEx.exercises
    }, 0)

      return(<>
        
        <Header key={uniquecourse.id} courses={uniquecourse}/>
        <div>{courserows()}</div>
        <div>Total excercises {total()}</div>
        </>
      )
    })

    return(<>
      <div>{headerows()} </div>
      </>
    )
}

const Content = (props) =>{
  const {parts} = props
  return (
    <li>{parts.name} {parts.exercises}</li>
  )
}

const Header = (props)=>{
  const {courses} = props
  return(
      <h1>{courses.name}</h1>
  )
}

export default Course