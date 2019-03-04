import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signup }from '../../modules/users/actions/userAuth_actions';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.onSubmit = this.onSubmit.bind(this);

  }


  onSubmit(formProps) {
    this.props.signup(formProps, () => {
      this.props.history.push('/');
    })




  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit = {handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
          className = "form-item"          
          name="email"
          type="text"
          component="input"
          autoComplete="none"
          />
          </fieldset>
        <fieldset>
          <label>Username</label>
          <Field
          className = "form-item"                    
          name="username"
          type="text"
          component="input"
          autoComplete="none"

          />
          </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
          className = "form-item"                    
          name="password"
          type="password"
          component="input"
          autoComplete="none"
          />
          </fieldset>
          <div>
            {this.props.errorMessage}
            </div>
          <button className = "form-submit">Sign Up</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.userAuth.errorMessage}
}

export default withRouter(compose(
  connect(mapStateToProps, {signup}),
  reduxForm({form: 'signup'})
)(Signup));

