import React from 'react'
import Course from './components/Course'

const App = (props) => {
    const {courses} = props
  
    return (<>
        <h1>Web development curriculum</h1>
        <div><Course courses={courses}/></div>  </>
    )}
    
export default App