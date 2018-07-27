// import { reducer as formReducer } from 'redux-form';
import { AUTH_USER, AUTH_ERROR, CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, ADD_USERBEER, FETCH_FEED, CURRENT_COMMENT, ADD_DELETE_LIKE, FETCH_USERS, FETCH_USER, GET_USER, FOLLOW_USER  } from '../actions';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER: 
      return {...state, authenticated: action.payload.token, userinfo: action.payload.user}
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload}
    case CREATE_COMMENT:
      return {...state, createdComment: action.payload}
    case DELETE_COMMENT:
      return {...state, deletedComment: action.payload}
    case UPDATE_COMMENT:
      return {...state, updatedComment: action.payload}
    case ADD_USERBEER:
      return {...state, newUserBeer: action.payload}
    case FETCH_FEED:
      return {...state, userFeed: action.payload.data.results}
    case ADD_DELETE_LIKE:
      return {...state, currentLike: action.payload}
    case CURRENT_COMMENT:
      return {...state, currentEditingComment: action.payload}
    case FETCH_USERS:
      return {...state, allUsers: action.payload}
    case FETCH_USER: 
      return {...state, currentUser: action.payload}  
    case FOLLOW_USER:
      return {...state, follow: action.payload }
    case GET_USER:
    console.log(action.payload)
      return {...state, userinfo: action.payload.data[0]}
    default: 
      return state;
  }

}