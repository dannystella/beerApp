import React, {Component} from 'react';
import $ from 'jquery';
import {Button, Icon, Footer} from 'react-materialize'




export default class FooterBottom extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (

<Footer copyrights="copy 2015 Copyright Text"
>
    <h5 className="white-text">Footer Content</h5>
    <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
</Footer>
      )
        
  }
}
