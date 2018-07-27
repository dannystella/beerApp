import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/loader.jsx';
import {fetchFeed, signin, signout, signup, createComment, deleteComment, updateComment, currentComment, addUserBeer, deleteUserBeer, fetchUser, followUser, unFollowUser, getUser}  from '../../modules/users/actions';
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
    console.log(userinfo)
    if(!currentUser) {
      return <div><Loader/></div>
    }
    return (
      
      <div style = {{paddingTop: 30 }}>
      <div>
        {currentUser.username}
        </div>
        <button onClick = {((e) => {
          console.log(userinfo.follows[currentUser._id]);
          this.props.followUser(currentUser, userinfo, this.reFetchFeed).then((res) => {
            this.props.getUser(userinfo, this.reFetchFeed);
          })
        })}>{userinfo.follows[currentUser._id] === true ? "Unfollow User" : "Follow User"}</button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
console.log(state, "stateeeee");
let currentUser;
if(state.userAuth.currentUser) {
  currentUser = state.userAuth.currentUser.data[0];
  // console.log("hit")
} else {
  currentUser = null;
}
let userinfo = utils.stringChecker(state.userAuth.userinfo);
// console.log(userinfo, "useringo")
  return {
    userinfo,
    currentUser
  }
}

export default connect(mapStateToProps, { fetchFeed,
  signin,
  signout,
  signup, 
  currentComment,
  createComment,
  deleteComment,
  updateComment,
  addUserBeer,
  deleteUserBeer,
  fetchUser,
  followUser,
  unFollowUser,
  getUser
})(ProfilePage);