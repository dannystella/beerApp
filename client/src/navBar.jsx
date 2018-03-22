import React, { Component } from 'react';
import $ from 'jquery';
import {Button, Icon, Navbar, NavItem} from 'react-materialize'
import { Menu } from 'semantic-ui-react'

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
      <div>
        <Navbar brand='logo' right fixed = {true} >
          <NavItem href='get-started.html'>Getting started</NavItem>
          <NavItem href='components.html'>Components</NavItem>
        </Navbar>
        </div>
    )
  }
}

