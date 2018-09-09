import _ from "lodash";
import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import styles from '../../dist/sidebar.css';
import { Button, Nav, NavDropdown, MenuItem, Image, Thumbnail } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import Sidebar from "react-sidebar";
import Dinosaur from './dinosaur.png'
import Joe from './joe.jpg';
import * as utils from '../utils/utils.js';
import {Navbar, NavItem, Icon } from "react-materialize";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.renderLinks = this.renderLinks.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }


  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  renderLinks() {
    if (this.props.auth) {
      return (
        <div>
        <NavItem>
          <NavLink className = "navItems" to="/signout">Signout</NavLink> 
        </NavItem>
        </div>
      )
    } else {
        return (
        <NavItem>          
        <NavLink className = "navItems" to="/login">Login</NavLink> 
        </NavItem>       
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
          <NavLink className = "navItems" to={`/profile/${this.props.userinfo._id}`}>
          <Image circle src= {Joe} style={{width: 30, marginLeft: 50, marginTop: 20, padding: "auto", height: 'auto'}}  />
          </NavLink> 
      )
    }
    return (<div></div>)
  }

  componentDidMount() {
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.sidenav');
    //   var instances = M.Sidenav.init(elems, options);
    // });
  }
  
  render() {
    var Img = <img className = "logo" src={Dinosaur}/>
    return (
          <Navbar fixed right options = {{preventScrolling: false}} brand = {Img}>
          <div className = "NavbarMaterial">
          {/* <NavItem>
          <NavLink className = "navItems labell" to="/">beeroisseur </NavLink> 
          </NavItem> */}
          <NavItem>
          <NavLink className = "navItems" to="/">Home</NavLink> 
          </NavItem>
          <NavItem>          
          <NavLink className = "navItems" to="/beers">Beers</NavLink> 
          </NavItem>
          <NavItem>          
          <NavLink className = "navItems" to="/Trends">Trends</NavLink>
          </NavItem>
          <NavItem>
          <NavLink className = "navItems" to="/users">Users</NavLink> 
          </NavItem>          
          <NavItem>
          {this.renderLinks()}
          </NavItem>
          <NavItem>
          {this.renderAvatar()}
          </NavItem>
          </div>
          </Navbar>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(state);
  let userinfo = utils.stringChecker(state.userAuth.userinfo);
  return { 
    auth: state.userAuth.authenticated,
    userinfo, 
    ...ownProps
   };
}

export default connect(mapStateToProps, null)(Navigation);




