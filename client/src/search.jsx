import React, {Component} from 'react';
import $ from 'jquery';
// import 'semantic-ui-css/semantic.min.css';r
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

const Searchbar = () => (
  <div className = "search">
    <div className="nav-wrapper">
        <div className="input-field">
          <input type="search" required/>
          <label className="label-icon"htmlFor="search"><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
        </div>
  
    </div>
  </div>
)

export default Searchbar