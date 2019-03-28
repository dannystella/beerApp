import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BeerReducer from './modules/beers/reducers/reducer_beers';
import ArticleReducer from './modules/articles/reducers/reducer_articles';
import * as userReducers from './modules/users/reducers/reducer_users';
import { LOG_OUT } from './modules/users/actions/userAuth_actions.js';

const appReducer = combineReducers({
  beers: BeerReducer,
  articles: ArticleReducer,
  form: formReducer,
  ...userReducers
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return appReducer(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {
    userAuth: { authenticated: localStorage.getItem('token'), userinfo: JSON.parse(localStorage.getItem('user')) }
  },
  composeEnhancers(applyMiddleware(promise, reduxThunk))
)

module.exports = store;