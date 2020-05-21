const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodChanged = {...state, good: state.good + 1}
      return goodChanged
    case 'OK':
      const okChanged = {...state, ok: state.ok + 1}
      return okChanged
    case 'BAD':
      const badChanged = {...state, bad: state.bad + 1}
      return badChanged
    case 'ZERO':
      const zeroState = {
          good: 0,
          ok: 0,
          bad: 0
      }
      return zeroState
    default: return state
  }
  
}

export default counterReducer