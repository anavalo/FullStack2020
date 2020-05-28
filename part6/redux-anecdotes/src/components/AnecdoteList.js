import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleVoteClick}) =>{
    return(
        <li>
            {anecdote.content} <br/>
            has {anecdote.votes}<button onClick={handleVoteClick}>vote</button>
        </li>
    )

}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const voteDispatcher = (content) =>{
        dispatch(vote(content))
        dispatch(setNotification(`you voted '${content.content}'`, 10))
    }

    return(
        <ul>{anecdotes.map(anecdote =>
            <Anecdote
            anecdote={anecdote}
            key={anecdote.id}
            handleVoteClick ={()=>voteDispatcher(anecdote)}
            />
        )}
        </ul>
    )
}

export default AnecdoteList