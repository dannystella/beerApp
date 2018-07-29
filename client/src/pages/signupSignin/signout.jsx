import React, { Component } from 'react';
import { connect } from 'react-redux';
import {signout} from '../../modules/users/actions/userAuth_actions';

class Signout extends Component {
  constructor(props) {
    super(props);

}
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return <div>
      Sorry to see you go!
      </div>
  }
}

export default connect(null, {
  signout
})(Signout);