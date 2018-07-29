import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {signin} from '../../modules/users/actions/userAuth_actions';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.onSubmit = this.onSubmit.bind(this);

  }


  onSubmit(formProps) {
    this.props.signin(formProps, () => {
      this.props.history.push('/');
    });


  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit = {handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
          name="email"
          type="text"
          component="input"
          autoComplete="none"
          />
          </fieldset>
        <fieldset>
          <label>Username</label>
          <Field
          name="username"
          type="text"
          component="input"
          autoComplete="none"

          />
          </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
          name="password"
          type="password"
          component="input"
          autoComplete="none"
          />
          </fieldset>
          <div>
            {this.props.errorMessage}
            </div>
          <button>Sign In</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.userAuth.errorMessage}
}

export default withRouter(compose(
  
  connect(mapStateToProps, {signin}),
  reduxForm({form: 'signin'})
)(Signin));

