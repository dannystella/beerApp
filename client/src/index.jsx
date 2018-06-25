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
import Beers from './pages/Beers.jsx';
import Trends from './pages/Trends.jsx';
import Login from './pages/Login.jsx';
import BeerForm from './pages/Addbeerform.jsx';
import BeerDetail from './pages/Beers/BeerDetail.jsx';
import ArticleDetail from './pages/Home/ArticleDetail.jsx';
import BeersContainer from './modules/beers/state/BeersContainer';
import ArticlesContainer from './modules/articles/state/ArticlesContainer';
import Signout from './pages/signupSignin/signout.jsx';
import Signin from './pages/signupSignin/signin.jsx';
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
        <Grid celled container>
        <NavBar>
          <Switch>
          <Route path="/Beers/:id" component = {BeerDetail}
          />
          <Route path="/Articles/:id" component = {ArticleDetail}
          />          
          <Route path="/signout" render={() => (
            <Signout/>   
          )} />          
          <Route path="/signin" render={() => (
            <Signin/>   
          )} />          
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
            <ArticlesContainer/>   
          )} />          
          </Switch>
        </NavBar>
        </Grid>
      </div>
    </HashRouter>
    );
  }
}
render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById("app"));
