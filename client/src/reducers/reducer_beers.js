import { FETCH_BEERS, FETCH_BEER } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_BEER:
    // const beer = action.payload.data;
    // const newState = {...state};
    // newState[beer.rank] = beer;
    // return newState;
    // return Object.assign({}, state, {
    //   [action.payload.data[0].rank]: action.payload.data[0]
    // })
      return {...state, [action.payload.data[0].rank]: action.payload.data[0]};
    case FETCH_BEERS: 
      return action.payload.data;
    default : 
      return state;
  }
}