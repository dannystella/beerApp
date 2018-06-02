import _ from "lodash";
import React, { Component } from "react";
import { render } from "react-dom";
import { Grid } from 'semantic-ui-react';
import {
  Route,
  NavLink,
  HashRouter,
  Switch
} from "react-router-dom";
import NavBar from './components/navbar.jsx';
import Main from './pages/Home.jsx';
import Beers from './pages/beers.jsx';
import Trends from './pages/trends.jsx';
import Login from './pages/login.jsx';
import BeerForm from './pages/addbeerform.jsx';
import BeerDetail from './pages/beerDetail.jsx';
import BeersContainer from './containers/BeersContainer';

import { Provider } from 'react-redux';
import store from './store';


export default class App extends React.Component {
  constructor(props) {
      super(props);


}


render() {
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
render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById("app"));
