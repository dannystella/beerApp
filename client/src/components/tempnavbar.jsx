import _ from "lodash";
import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import {Container,Icon, Menu,Sidebar,Responsive,Segment,Grid,Input} from "semantic-ui-react";
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem, Image, Thumbnail } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import Dinosaur from './dinosaur.png'
import Joe from './joe.jpg';
import * as utils from '../utils/utils.js';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.renderLinks = this.renderLinks.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
  }

  renderLinks() {
    if(this.props.auth) {
      
      return (
        <IndexLinkContainer activeClassName="" to="/signout">
          <NavItem eventKey={1.5}>Signout</NavItem>
        </IndexLinkContainer>
      )
        } else {
          return (
          <IndexLinkContainer activeClassName="" to="/Login">
            <NavItem eventKey={1.6}>Login</NavItem>
          </IndexLinkContainer>
          )
    }
  }
  handlePusher() {
    const { visible } = this.state;
  
    if (visible) this.setState({ visible: false });
  };

  handleToggle() {
    this.setState({
       visible: !this.state.visible
    });
  }

  renderAvatar() {
    if(this.props.auth && this.props.userinfo) {
      return (
        <IndexLinkContainer activeClassName = "avatarIcon" to = {`/profile/${this.props.userinfo._id}`}>
          <NavItem eventKey={1.4}><Image circle src= {Joe} style={{width: 30, marginLeft: 100,padding: "auto", height: 'auto'}}  /></NavItem>
        </IndexLinkContainer> )
    }
    return (<div></div>)
  }

  componentDidMount() {
    // Responsive.onlyMobile.minWidth-=360;
    // Responsive.onlyTablet.minWidth-=150;    
  }
  render() {
    return (
      <div className = "pushdown">
      <Navbar className = "navbarDesktop" fixedTop = {true} className = "realNav" inverse collapseOnSelect>
      <Navbar.Header style={{marginBottom: "10"}} className = "navIcon">
      <Navbar.Toggle className = "navToggleLeft" />
        <Navbar.Brand className= "navIcon" >
          <a href="#brand">Beeraseiur</a>
          </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav className = "mx-auto">
        <IndexLinkContainer activeClassName="" to="/">
          <NavItem  eventKey={1.1}>Home</NavItem>
        </IndexLinkContainer>
        <IndexLinkContainer activeClassName="" to="/beers">
          <NavItem eventKey={1.2}>Beers</NavItem>
        </IndexLinkContainer>
        <IndexLinkContainer activeClassName="" to="/Trends">
          <NavItem eventKey={1.3}>Trends</NavItem>
        </IndexLinkContainer>
        <IndexLinkContainer activeClassName="" to="/users">
          <NavItem eventKey={1.3}>Users</NavItem>
        </IndexLinkContainer>
        <IndexLinkContainer activeClassName="" to="/addBeer">
          <NavItem eventKey={1.4}>Add Beer To Database</NavItem>
        </IndexLinkContainer>
        {this.renderLinks()}
        {this.renderAvatar()}

        </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let userinfo = utils.stringChecker(state.userAuth.userinfo);
  return { 
    auth: state.userAuth.authenticated,
    userinfo, 
    ...ownProps
   };
}

export default connect(mapStateToProps, null)(Navigation);




