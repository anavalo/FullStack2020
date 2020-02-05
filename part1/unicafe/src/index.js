import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>{
const {onClick, text} = props
return (
  <button onClick={onClick}>
    {text}
  </button>
)}

const Statistics = (props) =>{
  const {percenttext, good, neutral, bad, allClicks, average}=props
  if (good ===0 || bad===0){
    return (
      <div>Not enough feedback gathered</div>
    )

    }
  return(
    <>
    <div>good {good} </div>
    <div>neutral {neutral} </div>
    <div>bad {bad} </div>
    <div>all {allClicks} </div>
    <div>average {average} </div>
    <div>positive {(good/allClicks)*100} {percenttext}</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1)
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
  }

  const handleBadClick = () =>{
    setBad(bad + 1)
  }
  
  const allClicks = (good + neutral + bad)
  const average = ((good*1)+(bad*(-1)))/allClicks

  return (
    <div>
      <h1>
      give feedback
      </h1>
      <div>
      <Button onClick={handleGoodClick} text='Good'/>
      <Button onClick={handleNeutralClick} text='Neutral'/>
      <Button onClick={handleBadClick} text='Bad'/>
      </div>
      <h1>Statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} 
        allClicks={allClicks} average={average} percenttext={'%'} />
      </div>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
