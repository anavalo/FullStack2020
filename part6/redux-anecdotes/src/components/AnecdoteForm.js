import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, hideNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm =() =>{
  const dispatch = useDispatch()

  const addAnecdote = (e) =>{
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value=''
    dispatch(createAnecdote(content))
    dispatch(newNotification(content))
    setTimeout(()=> dispatch(hideNotification()), 3000)
  }

  return(
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
    </>

  )
}

export default AnecdoteForm

