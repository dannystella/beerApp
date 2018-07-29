import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/loader.jsx';
import {fetchUser, fetchFeed}  from '../../modules/users/actions/general_actions';
import {followUser}  from '../../modules/users/actions/userActivities_actions';
import * as utils from '../../utils/utils.js';


class ProfilePage extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }


  this.reFetchFeed = this.reFetchFeed.bind(this);

  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUser(id).then((data) => { 
        // console.log(this.props.currentUser)
    }) 
  }

  reFetchFeed() {

      this.props.fetchFeed(this.props.userinfo);
  }

  render() {
    const { currentUser } = this.props;
    const {userinfo} = this.props;
    console.log(userinfo, currentUser, "HEROHs ")
    if(!currentUser) {
      return <div><Loader/></div>
    }
    return (
      <div style = {{paddingTop: 30 }}>
      <div>
        {currentUser.username}
        </div>
        <button onClick = {((e) => {
          return this.props.followUser(currentUser, userinfo, this.reFetchFeed)
        })}>{userinfo.follows[currentUser._id] === true ? "Unfollow User" : "Follow User"}</button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
console.log(state, "stateeeee");
let currentUser;
if(state.generalActions.currentUser) {
  currentUser = state.generalActions.currentUser.data[0];
  // console.log("hit")
} else {
  currentUser = null;
}
let userinfo = utils.stringChecker(state.userAuth.userinfo);
if(state.userActivities.userinfo) {
  userinfo = state.userActivities.userinfo;
}
console.log(userinfo, "useringo")
  return {
    userinfo,
    currentUser
  }
}

export default connect(mapStateToProps, { 
fetchFeed,
fetchUser,
followUser
})(ProfilePage);