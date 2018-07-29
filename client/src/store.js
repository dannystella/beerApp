import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BeerReducer from './modules/beers/reducers/reducer_beers';
import ArticleReducer from './modules/articles/reducers/reducer_articles';
import * as userReducers from './modules/users/reducers/reducer_users';

const rootReducer = combineReducers({
  beers: BeerReducer,
  articles: ArticleReducer,
  form: formReducer,
  ...userReducers
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {
    userAuth: {authenticated: localStorage.getItem('token'), userinfo: localStorage.getItem('user')}
  },
  composeEnhancers(applyMiddleware(promise, reduxThunk))
)

module.exports = store;