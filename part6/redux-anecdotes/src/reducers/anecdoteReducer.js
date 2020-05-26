const getId = () => (100000 * Math.random()).toFixed(0)

export const vote = (id) => {
  console.log('vote', id)
  return {
    type: 'INCREMENT',
    data: {id}
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE_NEW',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {

    case 'INCREMENT':
      const id = action.data.id
      const ancedoteToChange = state.find(m=>m.id === id)
      const changedAnecdote = {
        ...ancedoteToChange, votes: ancedoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id? anecdote : changedAnecdote)

    case 'CREATE_NEW':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export default reducer