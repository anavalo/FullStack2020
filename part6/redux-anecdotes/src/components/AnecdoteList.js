import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state)

    return(
        <ul>{anecdotes.map(anecdote =>
            <Anecdote
            anecdote={anecdote}
            key={anecdote.id}
            handleVoteClick ={() => dispatch(vote(anecdote.id))}
            />
        )}
        </ul>
    )
}



export default AnecdoteList