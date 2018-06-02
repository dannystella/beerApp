import promise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BeerReducer from './modules//beers/reducers/reducer_beers';

const rootReducer = combineReducers({
  beers: BeerReducer,
  form: formReducer
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promise))
)

module.exports = store;