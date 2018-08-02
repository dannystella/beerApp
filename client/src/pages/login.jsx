import React, { Component } from 'react';
import axios from 'axios';
import GridColumn, { Grid, Image } from 'semantic-ui-react';
import Signup from './signupSignin/signup.jsx';
import Signin from './signupSignin/signin.jsx';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trigger: false
        }
        
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
      const flag = !this.state.trigger;
      this.setState({
        trigger: flag
      }, () => {console.log(this.state.trigger)})
    }

    render() {
        return (
            <div className="center">
                {this.state.trigger ? (
                <div className = "sign-form">
                    <h1>Sign Up</h1>
                    <Signup/>
                    <button className = "form-submit" onClick = {this.onClick}>Already have an account? Sign in!</button>   
                </div>         
                ) : (
                <div className = "sign-form">
                    <h1>Sign In</h1>
                    <Signin />
                    <button className = "form-submit" onClick = {this.onClick}>No Account? Sign up</button>
                </div>)}
            </div>
        );
    }
}


export default Login;