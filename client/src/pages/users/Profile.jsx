import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/loader.jsx';
import {fetchUser, fetchFeed}  from '../../modules/users/actions/general_actions';
import {followUser, addAvatar}  from '../../modules/users/actions/userActivities_actions';
import * as utils from '../../utils/utils.js';
import imgix from '../../config';

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
    const userinfo = utils.stringChecker(this.props.userinfo);
    console.log(currentUser);
    if(!currentUser) {
      return <div><Loader/></div>
    }
    if(currentUser._id === userinfo._id) {
      return (
        <div style = {{paddingTop: 30 }}>
        <p>Change Avatar</p>
          <div className="image-upload">
              <label htmlFor="file-input">
                  <img src = {imgix.baseUrl + `/${this.props.currentUser._id}.jpg?versionId=null?auto=enhance`} onError={(e)=>{e.target.src= imgix.baseUrl + '/joejoe.jpg?auto=enhance'}}/>
              </label>
              <input onChange = {(async (e) =>  {
                var input = document.getElementById("file-input");
                var fReader = new FileReader();
                fReader.readAsDataURL(input.files[0]);
                let closure = this.props.addAvatar;
                let props =  this.props.userinfo;
                let stream = this.props.streamData;
                fReader.onloadend = function(event) {
                        // var img = document.getElementById("yourImgTag");
                        return closure(event.target, props, stream);
                }
                
                })} id="file-input" name = "image userinfo" type="file"/>
          </div>      
        <div>
          {currentUser.username}
          </div>
          {/* <button onClick = {((e) => {
            return this.props.followUser(currentUser, userinfo, this.reFetchFeed)
          })}>{userinfo.follows[currentUser._id] === true ? "Unfollow User" : "Follow User"}</button> */}
        </div>
      )
    } else {
      return (
        <div style = {{paddingTop: 30 }}>
          <div className="image-upload">
              <label htmlFor="file-input">
                  <img src = {imgix.baseUrl + `/${this.props.currentUser._id}.jpg?versionId=null?auto=enhance`} onError={(e)=>{e.target.src= imgix.baseUrl + '/joejoe.jpg?auto=enhance'}}/>
              </label>
          </div>      
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
}

function mapStateToProps(state, ownProps) {
  let currentUser;
  let streamData;
  console.log(state)
  if(state.generalActions.currentUser) {
    currentUser = state.generalActions.currentUser.data[0];
  } else {
    currentUser = null;
  }
  let userinfo = utils.stringChecker(state.userAuth.userinfo);
  if(state.userActivities.userinfo) {
    userinfo = state.userActivities.userinfo;
  }
  if(state.generalActions.currentUser) {
    console.log(state.generalActions.currentUser.data[0])
    streamData = state.generalActions.currentUser.data[0];
  }
    return {
      userinfo,
      currentUser,
      streamData
    }
}

export default connect(mapStateToProps, { 
fetchFeed,
fetchUser,
addAvatar,
followUser
})(ProfilePage);