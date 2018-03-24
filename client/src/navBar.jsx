import React, { Component } from 'react';
import $ from 'jquery';
import {Button, Icon, Navbar, NavItem} from 'react-materialize'
import { Menu } from 'semantic-ui-react'
import Searchbar from './search.jsx';


export default class Navigation extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
      activeItem: 'home'
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick( e, {name} ){
    console.log(name);
    this.setState({
       activeItem: name
    })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className = "navbar">

        <Navbar brand='logo' right className= '#212121 grey darken-4' >
          <NavItem className = "item" >Home</NavItem>
          <NavItem className = "item" >Beers</NavItem>
          <NavItem className = "item" >Pub</NavItem>
          <NavItem className = "item" >Login</NavItem>
          <Searchbar className = "search" />
        </Navbar>

        </div>
    )
  }
}

