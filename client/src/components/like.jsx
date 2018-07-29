import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { addDeleteLike, fetchFeed } from '../modules/users/actions/userActivities_actions';
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
  addDeleteLike
})(Like);
