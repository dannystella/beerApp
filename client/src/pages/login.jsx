import React, { Component } from 'react';
import axios from 'axios';
import Signup from './signupSignin/signup.jsx';

// import decode from 'jwt-simple'


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.onPost = this.onPost.bind(this);
        // this.handleUsername = this.handleUsername.bind(this);
        // this.handlePassword = this.handlePassword.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    onPost() {
      let user = {
        email: 'test',
        username: 'test',
        password: 'test',
        summary: 'test',
        comments: ["test"]
      }
      axios.post('/users/signup', user).then((res) => {
          console.log(res);
      })
    }


//     handleSubmit(e) {
//         e.preventDefault();
        
//         var username = this.state.username.trim();
// 		var password = this.state.password.trim();
//         var data = {username: username, password: password}

//         if (!username || !password) {
//           return;
//         }

//         axios.post('/goals/login', data)
//         .then((data) => {
//             this.props.setToken(data.data);
//         }).catch((err) => {
//             console.log(err);
//         })

//         console.log('form submitted!');

//         return;
// }
// handleUsername(e) {
//   this.setState({
//     username: e.target.value
//   })
// }

// handlePassword(e) {
//   this.setState({
//     password: e.target.value
//   })
// }
    render() {
        return (
            <div className="center">
              <Signup/>
                {/* <div className="card">
                    <h1>Login</h1>
                    <form
                    //  onSubmit = {this.handleSubmit}
                     >
                        <input
                            className="form-item"
                            placeholder="Username"
                            name="username"
                            type="text"
                            // onChange={this.handleUsername}
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            // onChange={this.handlePassword}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
                <button onClick = {this.onPost}>Click</button> */}
            </div>
        );
    }
}

export default Login;