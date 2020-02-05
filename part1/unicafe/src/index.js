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
  const {text, value, percenttext}=props
  return(
    <div>{text} {value} {percenttext}</div>
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
        <Statistics text = 'good' value={good}/>
        <Statistics text = 'neutral' value={neutral}/>
        <Statistics text = 'bad' value={bad}/>
        <Statistics text = 'average' value={average}/>
        <Statistics text = 'positive' value={good/allClicks} percenttext={'%'} />
      </div>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
