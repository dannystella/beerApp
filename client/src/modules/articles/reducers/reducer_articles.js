import { FETCH_ARTICLES } from '../actions';
import { FETCH_ARTICLE } from '../actions';


export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return action.payload.data
    case FETCH_ARTICLE:
      return { ...state, [action.payload.data[0]._id]: action.payload.data[0] };

    default:
      return state;
  }
}