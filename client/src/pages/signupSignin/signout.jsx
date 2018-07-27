import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../modules/users/actions';

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

export default connect(null, actions)(Signout);