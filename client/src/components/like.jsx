import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {fetchFeed, signin, signout, signup, createComment, deleteComment, updateComment, currentComment, addUserBeer, deleteUserBeer, addDeleteLike} from '../modules/users/actions';
import * as actions from '../modules/users/actions';
import { Feed, Icon } from 'semantic-ui-react';


const Like = (props) => (
  <div>
<Feed.Like>
  {/* {  console.log(props.item) } */}
<Icon name='like' onClick = {((e) => {
    props.addDeleteLike(props.item, props.reFetchFeed, props.userAuth);
})} />
  {props.item.likes} Likes
</Feed.Like>
  </div>  
);


function mapStateToProps(state, ownProps) {
  let initialCommentValue = null;
  let likeStatus;
  if(!state.userAuth.likeStatus) {
    likeStatus = null;
  } else {
    likeStatus = state.userAuth.likeStatus.likeStatus;
  }
  if(state.userAuth.currentEditComment) {
    initialCommentValue = state.userAuth.currentEditComment;
  }
  // console.log(likeStatus)
  return {
    userAuth: state.userAuth,
    initialCommentValue,
    likeStatus
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
  addDeleteLike
})(Like);
