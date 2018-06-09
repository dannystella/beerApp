import _ from "lodash";
import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
  Segment,
  Grid,
  Input
} from "semantic-ui-react";
import Dinosaur from './dinosaur (1).png'
const NavBarMobile = ({children, leftItems, onPusherClick, onToggle, rightItems, visible}) => (
  <div>
      <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
      borderless ={true}
      fixed="left"
      className = "sidebar"
      style={{ minHeight: "100vh", transitionDuration:".25s", width: 300}}
    >
        <Menu.Item >
        <NavLink to="/">Home</NavLink> 
        </Menu.Item >
        <Menu.Item >
        <NavLink to="/Beers">Beers</NavLink> 
        </Menu.Item >
        <Menu.Item >
        <NavLink to="/Trends">Trends</NavLink> 
        </Menu.Item >
        <Menu.Item >
        <NavLink to="/Login">Login</NavLink> 
        </Menu.Item >
        <Menu.Item >
        <NavLink to="/addBeer">AddBeer</NavLink> 
        </Menu.Item >
      </Sidebar>
    <Sidebar.Pushable  className = "sidebar">
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh", transitionDuration:".25s"}}
      >
      {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
      <Menu fixed="top" inverted borderless ={true} className = "navbarMobile">
        <Menu.Item className = "burger" onClick={onToggle}>
          <Icon link inverted  name="sidebar" size = "large" />
        </Menu.Item>
        <Menu.Item className = "navHeaderMobile">
          {/* <Image size="mini" className= "navIcon" src={Dinosaur} />  */}
          <Menu.Header className = "navHeaderMobile" >Beerasieur</Menu.Header>
        </Menu.Item>
        <Menu.Menu position="right">
        
        </Menu.Menu>
      </Menu>
  </div>
);

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Grid celled container>
  <Grid.Row columns = {1}>
  <Grid.Column width={16}>
 <Menu widths= "3" fixed="top" inverted borderless ={true} className = "navbarDesktop">
    <Menu.Item >
    <Image size="mini" className= "navIcon" src={Dinosaur} />
      <Menu.Header className = "navHeader" >Beerasieur</Menu.Header>      
    </Menu.Item>
<Menu.Menu className = "yo">
    <Menu.Item className = "navItems" >
    <NavLink className = "navItems" to="/">Home</NavLink> 
    </Menu.Item >
    <Menu.Item className = "navItems" >
    <NavLink className = "navItems" to="/Beers">Beers</NavLink> 
    </Menu.Item>
    <Menu.Item className = "navItems" >
    <NavLink className = "navItems" to="/Trends">Trends</NavLink> 
    </Menu.Item >
    <Menu.Item  >
    <NavLink className = "navItems" to="/Login">Login</NavLink> 
    </Menu.Item >
    </Menu.Menu>
    <Menu.Menu  className= "oy" position="left"> 
      <Menu.Item className = 'search'>

      </Menu.Item>
    </Menu.Menu>
  </Menu>
  </Grid.Column >
  </Grid.Row>
  </Grid>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.handlePusher = this.handlePusher.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }


  handlePusher() {
    const { visible } = this.state;
  
    if (visible) this.setState({ visible: false });
  };

  handleToggle(){this.setState({ visible: !this.state.visible });}
  componentDidMount() {
    // Responsive.onlyMobile.minWidth-=360;
    // Responsive.onlyTablet.minWidth-=150;    
  }
  render() {
    const { children } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <Responsive {...Responsive.onlyMobile} minWidth = {Responsive.onlyMobile.minWidth} >
          <NavBarMobile
            // leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop onToggle = {(e) => {
            if(this.state.visible){
              this.handleToggle();
            }
          }}/>
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}

const leftItems = [
  { as: "a", content: "Home", key: "Home" },
  { as: "a", content: "Beers", key: "Beers" },
  { as: "a", content: "Pub", key: "Pub" },
  { as: "a", content: "Profile", key: "Profile" },
  { as: "a", content: "Login", key: "Login" }
];
const rightItems = [
];


