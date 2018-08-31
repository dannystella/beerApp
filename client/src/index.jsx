import _ from "lodash";
import React, { Component } from "react";
import { render } from "react-dom";
import { Grid, Container } from 'semantic-ui-react';
import {
  Route,
  NavLink,
  HashRouter,
  BrowserRouter,
  Switch
} from "react-router-dom";
import { Provider } from 'react-redux';

import Navigation from './components/tempnavbar.jsx';
import NavBar from './components/navbar.jsx';

import Main from './pages/Home.jsx';
import Beers from './pages/Beers.jsx';
import Trends from './pages/Trends.jsx';
import Login from './pages/Login.jsx';
import BeerForm from './pages/Addbeerform.jsx';
import BeerDetail from './pages/Beers/BeerDetail.jsx';
import ArticleDetail from './pages/Home/ArticleDetail.jsx';
import BeersContainer from './modules/beers/state/BeersContainer';
import UserBeerForm from './components/checkUserBeerForm.jsx';
import Signout from './pages/signupSignin/signout.jsx';
import Signin from './pages/signupSignin/signin.jsx';
import Users from './pages/users.jsx';
import ProfilePage from './pages/users/Profile.jsx';

import store from './store';


export default class App extends React.Component {
  constructor(props) {
      super(props);


}


render() {
  return(
    <HashRouter>
      <div className = "fullContainer">
        <Navigation/>
        <div className = "pushDown" >
          <Switch>
          <Route path="/profile/:id" component = {ProfilePage}
          />
          <Route path="/beers/:id" component = {BeerDetail}
          />
          <Route path="/Articles/:id" component = {ArticleDetail}
          />          
          <Route path="/signout" render={() => (
            <Signout/>   
          )} />          
          <Route path="/signin" render={() => (
            <Signin/>   
          )} />          
          <Route path="/beers" render={() => (
            <BeersContainer/>   
          )} />
          <Route path="/users" render={() => (
            <Users/>   
          )} />
          <Route path="/Trends" render={() => (
            <Trends/>   
          )} />
          <Route path="/Login" render={() => (
            <Login />   
          )} />
          <Route path="/addBeer" render={() => (
            <BeerForm handleForm = {this.handleForm}/> 
          )} />
          <Route path="/" render={() => (
            <Main/>   
          )} />          
          </Switch>
          </div>
      </div>
    </HashRouter>
    );
  }
}

render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById("app"));
