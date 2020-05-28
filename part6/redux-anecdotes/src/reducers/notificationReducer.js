const initialState = []

export const setNotification = (message, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: null
      }, time * 1000)
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: message
      })
    })
  }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_NOTIFICATION':
      return [action.data]
    // case 'NEW_VOTE':
    //   return [action.data.text]
    // case 'HIDE_NOTIFICATION':
    //   return []
    default:
      return state
    }
}

export default reducer