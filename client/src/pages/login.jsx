import React, { Component } from 'react';
import axios from 'axios';
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
                <div>
                    <h1>Sign Up</h1>
                    <Signup/>
                    <button onClick = {this.onClick}>Already have an account? Sign in!</button>   
                </div>         
                ) : (
                <div>
                    <h1>Sign In</h1>
                    <Signin />
                    <button onClick = {this.onClick}>No Account? Sign up</button>
                </div>)}
            </div>
        );
    }
}


export default Login;