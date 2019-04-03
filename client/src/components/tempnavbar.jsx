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
import { Navbar, NavItem, Icon } from "react-materialize";
import s3 from '../config';

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
          <NavLink className="navItems" to="/signout">Signout</NavLink>
        </div>
      )
    } else {
      return (
        <NavLink className="navItems" to="/login">Login</NavLink>
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
    if (this.props.auth && this.props.userinfo) {
      return (
        <NavLink className="navItems" to={`/profile/${this.props.userinfo._id}`}>
          <Image circle className="feedImage" src={s3.baseUrl + `${this.props.userinfo._id}.jpg`} onError={(e) => { e.target.src = 'https://s3.amazonaws.com/beerappworld/uploads/joe.jpg' }} style={{ width: 30, marginLeft: 50, marginTop: 20, padding: "auto", height: 'auto' }} />
        </NavLink>
      )
    }
    return (<div></div>)
  }

  componentDidMount() {

  }

  render() {
    var Img = <img className="logo" src={Dinosaur} />
    return (
      <Navbar fixed right options={{ preventScrolling: false }} brand={Img}>
        <div className="NavbarMaterial">
          <li>
            <NavLink className="navItems" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className="navItems" to="/beers">Beers</NavLink>
          </li>
          <li>
            <NavLink className="navItems" to="/Trends">Trends</NavLink>
          </li>
          <li>
            <NavLink className="navItems" to="/users">Users</NavLink>
          </li>
          <li>
            {this.renderLinks()}
          </li>
          <li>
            {this.renderAvatar()}
          </li>
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let userinfo = utils.stringChecker(state.userAuth.userinfo);
  console.log(userinfo);
  return {
    auth: state.userAuth.authenticated,
    userinfo,
    ...ownProps
  };
}

export default connect(mapStateToProps, null)(Navigation);




