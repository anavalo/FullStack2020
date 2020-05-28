import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

export const vote = (anecdote) => {
  return async dispatch => {
    const updAnecdote = await anecdoteService.update(anecdote)
    dispatch({
        type: 'INCREMENT',
        data: updAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_NEW',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {

    case 'INCREMENT':
      return state.map(a => a.id !== action.data.id? a : action.data)

    case 'CREATE_NEW':
      return [...state, action.data]

    case 'INIT':
      return action.data

    default:
      return state
  }
}

export default reducer