import { AUTH_ERROR, AUTH_USER } from '../actions/userAuth_actions.js';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
}

function userAuth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER: 
      return {...state, authenticated: action.payload.token, userinfo: action.payload.user}
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload}
    default: 
      return state;  
  }

}


export {userAuth};