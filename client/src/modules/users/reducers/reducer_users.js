// import { reducer as formReducer } from 'redux-form';
import { AUTH_USER, AUTH_ERROR } from '../actions';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER: 
      return {...state, authenticated: action.payload}
      case AUTH_ERROR:
      return {...state, errorMessage: action.payload}
    default: 
      return state;
  }

}