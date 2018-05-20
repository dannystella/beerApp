import _ from "lodash";
import React, { Component } from "react";
import { render } from "react-dom";
import NavBar from './components/navbar.jsx';
import Main from './components/Home.jsx';
import Beers from './components/beers.jsx';
import Trends from './components/trends.jsx';
import Login from './components/login.jsx';
import BeerForm from './components/addbeerform.jsx';
import BeerDetail from './components/beerDetail.jsx';
import BeersContainer from './containers/BeersContainer';
import {
  Route,
  NavLink,
  HashRouter,
  Switch
} from "react-router-dom";
import promise from 'redux-promise';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export default class App extends React.Component {
  constructor(props){
      super(props);


}


render() {
  console.log(BeersContainer);
  return(
    <HashRouter>
      <div>
        <NavBar>
          <Switch>
          <Route path="/Beers/:id" component = {BeerDetail}
          />
          <Route path="/Beers" render={() => (
            <BeersContainer/>   
          )} />
          <Route path="/Trends" render={() => (
            <Trends/>   
          )} />
          <Route path="/Login" render={() => (
            <Login/>   
          )} />
          <Route path="/addBeer" render={() => (
            <BeerForm handleForm = {this.handleForm}/> 
          )} />
          <Route path="/" render={() => (
            <Main/>   
          )} />          
          </Switch>
        </NavBar>
      </div>
    </HashRouter>
    );
  }
}
render(<Provider store={createStoreWithMiddleware(reducers)}>
  <App />
</Provider>, document.getElementById("app"));
