import { FETCH_FEED, FETCH_USER, FETCH_USERS } from '../actions/general_actions.js';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
}

function generalActions(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FEED:
      return { ...state, userFeed: action.payload.data.results }
    case FETCH_USERS:
      return { ...state, allUsers: action.payload }
    case FETCH_USER:
      return { ...state, currentUser: action.payload }
    default:
      return state;
  }
}

export { generalActions };