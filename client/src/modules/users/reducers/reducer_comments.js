import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, CURRENT_COMMENT, } from '../actions/comments_actions.js';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
}

function Comments(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return {...state, createdComment: action.payload}
    case DELETE_COMMENT:
      return {...state, deletedComment: action.payload}
    case UPDATE_COMMENT:
      return {...state, updatedComment: action.payload}
    case CURRENT_COMMENT:
      return {...state, currentEditingComment: action.payload}
    default: 
      return state;
  }

}

export {Comments};