// import { reducer as formReducer } from 'redux-form';
import {ADD_USERBEER, ADD_DELETE_LIKE, FOLLOW_USER } from '../actions/userActivities_actions';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
}

function userActivities(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_USERBEER:
      return {...state, newUserBeer: action.payload}
    case ADD_DELETE_LIKE:
      return {...state, currentLike: action.payload}
    case FOLLOW_USER:
      return {...state, userinfo: action.payload }
    default: 
      return state;
  }
}

export {userActivities};