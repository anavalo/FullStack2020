const initialState = []

export const newNotification = (content) => {
    return {
        type: 'NEW_NOTIFICATION',
        data: {
          text: `You added "${content}"`
        }
      }
    }

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export const voteNotification = (content) => {
  return {
    type: 'NEW_VOTE',
    data :{
        text: `You voted "${content}"`
    }
  }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_NOTIFICATION':
      return [action.data.text]
    case 'NEW_VOTE':
      return [action.data.text]
    case 'HIDE_NOTIFICATION':
      return []
    default:
      return state
    }
}

export default reducer