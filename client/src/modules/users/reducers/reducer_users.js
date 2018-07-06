// import { reducer as formReducer } from 'redux-form';
import { AUTH_USER, AUTH_ERROR, CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, FETCH_FEED } from '../actions';

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
      console.log("new comment" , action.payload);
      return {...state, createdComment: action.payload}
      case DELETE_COMMENT:
      return {...state, deletedComment: action.payload}
      case UPDATE_COMMENT:
      return {...state, updatedComment: action.payload}
      case FETCH_FEED:
      console.log("hitting feed", action.payload.data.results);
      return {...state, userFeed: action.payload.data.results}
    default: 
      return state;
  }

}