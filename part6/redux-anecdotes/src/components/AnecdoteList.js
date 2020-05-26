import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotification, hideNotification } from '../reducers/notificationReducer'


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
    const voteDispatcher = (id, content) =>{
        dispatch(vote(id))
        dispatch(voteNotification(content))
        setTimeout(()=> dispatch(hideNotification()), 3000)
    }

    return(
        <ul>{anecdotes.map(anecdote =>
            <Anecdote
            anecdote={anecdote}
            key={anecdote.id}
            handleVoteClick ={()=>voteDispatcher(anecdote.id, anecdote.content)}
            />
        )}
        </ul>
    )
}



export default AnecdoteList