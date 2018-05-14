import _ from 'lodash';
import { FETCH_BEERS, FETCH_BEER, DELETE_BEER } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case DELETE_BEER:
    console.log(action.payload, state);
      return _.reject(state, beer => beer._id === action.payload);
    case FETCH_BEER:
    // const beer = action.payload.data;
    // const newState = {...state};
    // newState[beer.rank] = beer;
    // return newState;
    // return Object.assign({}, state, {
    //   [action.payload.data[0].rank]: action.payload.data[0]
    // })
      return {...state, [action.payload.data[0]._id]: action.payload.data[0]};
    case FETCH_BEERS: 
      return action.payload.data;
    default : 
      return state;
  }
}