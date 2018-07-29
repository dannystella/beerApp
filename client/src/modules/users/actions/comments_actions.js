import axios from 'axios';
import * as utils from '../../../utils/utils.js';

export const CREATE_COMMENT= 'create_comment';
export const DELETE_COMMENT = 'delete_comment';
export const UPDATE_COMMENT = 'update_comment';
export const CURRENT_COMMENT = 'current_comment';

export function currentComment(comment) {  
  return {
    type: CURRENT_COMMENT,
    payload: comment
  }
}
  
export const createComment = (values, callback, id, trigger, beerReview) => async(dispatch) => {
  console.log(callback)
  try {
  const commentObj = {};
  commentObj.values = values;
  commentObj.id = id;
  commentObj.trigger = trigger;
  commentObj.beerReview = beerReview;
  let token = localStorage.getItem('token');
  const request = axios.post('/users/addcomments', commentObj, {
    headers: { Authorization: token }
  })
  .then((res) => {
    if(callback) {
      callback();
    }
  });
  dispatch ({
    type: CREATE_COMMENT,
    payload: commentObj
  })
  }
  catch(e) {
    console.log("error in create comment");
  }
}
  
  export const deleteComment = (commentInfo, beerInfo, callback) => async(dispatch) => {
    try {
    const params = {}
    params.beerInfo = beerInfo;
    params.commentInfo = commentInfo;
    let commentId = commentInfo.id;
    let token = localStorage.getItem('token')
    const request = axios.delete(`/users/deletecomments/${commentId}`, {
      data: { Authorization: token, params: params }
    })
    .then((res) => {
      if(callback) {
        callback();
      }
    });
  
    dispatch ({
      type: DELETE_COMMENT,
      payload: request.data
    })
    }
    catch(e) {
      console.log(e);
    }
  }
  
  export const updateComment = (values, callback, id, trigger, beerReview) => async (dispatch) => {
    console.log(values, callback, id, trigger, beerReview);
  
    try {
    const params = {}
  
    params.comment = values;
    params.pastInfo = beerReview;
    let token = localStorage.getItem('token');
    const request = axios.put(`/users/updatecomments/${beerReview.beerObj.id}`, {
      data: { Authorization: token, params: params }
    })
    .then((res) => {
      if(callback) {
        callback();
      }
    });
    dispatch({
      type: UPDATE_COMMENT,
      payload: params
    })
    }
    catch (e) {
      console.log("error in update comment");
    }
  }