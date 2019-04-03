import _ from 'lodash';
import { FETCH_BEERS, FETCH_BEER, DELETE_BEER } from '../actions';
import { BY_RANK, BY_BEERNAME, BY_ABV, BY_TYPE, BY_BREWERY } from '../actions/sortBeers';

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_BEER:
      return _.reject(state, beer => beer._id === action.payload);
    case FETCH_BEER:
      return { ...state, [action.payload.data[0]._id]: action.payload.data[0] };
    case FETCH_BEERS:
      return action.payload.data.sort(function (a, b) {
        return a.rank - b.rank
      })
    case BY_RANK:
      return state.slice().sort(function (a, b) {
        return a.rank - b.rank
      })
    case BY_BEERNAME:
      return state.slice().sort(function (a, b) {
        if (a.beername > b.beername) return 1;
        if (a.beername < b.beername) return -1;
        return 0;
      })
    case BY_ABV:
      return state.slice().sort(function (a, b) {
        return a.abv - b.abv;
      })
    case BY_TYPE:
      let newArr = state.slice();
      return sortByType(newArr);

    case BY_BREWERY:
      let sortArr = state.slice();
      return sortByBrewery(sortArr);

    default:
      return state;
  }
}



const sortByType = (arr) => {
  let newBeers = arr;
  newBeers = _.groupBy(newBeers, 'type');
  var ordered = {};
  Object.keys(newBeers).sort().forEach(function (key) {
    ordered[key] = newBeers[key];
  });
  let byType = [];
  for (var item in ordered) {
    byType.push(newBeers[item]);
  }
  byType = _.flattenDeep(byType);
  return byType;
}

const sortByBrewery = (arr) => {
  let newBeers = arr;
  newBeers = _.groupBy(newBeers, 'breweryname');
  var ordered = {};
  Object.keys(newBeers).sort().forEach(function (key) {
    ordered[key] = newBeers[key];
  });
  let byBrewery = [];
  for (var item in ordered) {
    byBrewery.push(newBeers[item]);
  }
  byBrewery = _.flattenDeep(byBrewery);
  return byBrewery;
}