import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>{
const {onClick, text} = props
return(
    <button onClick={onClick}>
        {text}
    </button>
)}

const App = (props) => {
    const anecdotes = ['If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.']

  const [selected, setSelected] = useState(0)
  const [randomNum, setRandomNum] = useState([0])
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    function randomGen(){
        return Math.floor((Math.random() * anecdotes.length))
    }
  const clickAnecdotes = () =>{
      let num = randomGen()
      setSelected(num)
      setRandomNum(randomNum.concat(num))
  } 
  const clickVote = () =>{
      let pos = randomNum.slice(-1).pop()
      let copy = [...votes]
      copy[pos] +=1
      setVotes(copy)
  }
return(<div>
    <h1>Anecdote of the Day</h1>
    <div>{anecdotes[selected]}</div>
    <div>has {votes[selected]} votes</div>
    <div>
    <Button onClick={clickVote} text='vote'/>
    <Button onClick={clickAnecdotes} text='random anecdote'/>

    </div>
    <h1>Anecdote with most votes</h1>
    <div>{anecdotes[votes.indexOf(Math.max(...votes))]} </div>
    <div>has {Math.max(...votes)}</div>

    </div>
)}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
