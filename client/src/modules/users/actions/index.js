import axios from 'axios';
import * as utils from '../../../utils/utils.js';
export const FETCH_FEED = 'fetch_feed';
export const FETCH_USERS = 'fetch_users';
export const FETCH_USER = 'fetch_user';
export const CREATE_COMMENT= 'create_comment';
export const DELETE_COMMENT = 'delete_comment';
export const UPDATE_COMMENT = 'update_comment';
export const ADD_USERBEER = 'add_userbeer';
export const DELETE_USERBEER = 'delete_userbeer';
export const UPDATE_USERBEER = 'update_userbeer';
export const ADD_DELETE_LIKE = 'add_delete_like';
export const FOLLOW_USER = 'follow_user';
export const UNFOLLOW_USER = 'unfollow_user';
export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';
export const CURRENT_COMMENT = 'current_comment';
export const GET_USER = 'get_user';


export function fetchFeed(userinfo) {
  if (typeof userinfo === 'string') {
    userinfo = JSON.parse(userinfo);
  }
  if(userinfo === null) {
    return {
      type: AUTH_ERROR,
      payload: 'auth error'
    };
  }
  let username = userinfo.username;
  const request = axios.get('/users/getfeed', {headers: {username: username}})
  return {
    type: FETCH_FEED,
    payload: request
  }
}

export function fetchUsers() {
  let token = localStorage.getItem('token');
  const request = axios.get('/users/getusers')

  return {
    type: FETCH_USERS,
    payload: request
  }
}

export function fetchUser(id) {
  let token = localStorage.getItem('token');
  const request = axios.get(`/users/getuser/${id}`)

  return {
    type: FETCH_USER,
    payload: request
  }  
}

export function currentComment(comment) {

// console.log(comment);

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

export const deleteUserBeer = (beerinfo, userinfo, callback) => async(dispatch) => {
  try {
    const params = {};
    params.beerInfo = beerinfo;
    params.userInfo= userinfo;
    let token = localStorage.getItem('token');
    const request = axios.delete(`/users/deletebeer/${beerinfo.id}`, {
      data: { Authorization: token, params: params }
    }).then((res) => {
      if(callback) {
        callback();
      }
    });

  }

  catch(e) {
    console.log(e);
  }
}

export const addUserBeer = (values, userinfo, callback) => async (dispatch) => {
  try {
    const beerObj = {};
    beerObj.values = values;
    beerObj.userinfo = userinfo;
    let token = localStorage.getItem('token');
    const request = axios.post('/users/addbeers', beerObj, {
      headers: { Authorization: token }
    })
    .then((res) => {
      var newBeerInfo = res;
      if(callback) {
        callback();
      }
    });
  dispatch({
    type: ADD_USERBEER,
    payload: newBeerInfo
  })
  }
  catch (e) {
    console.log("error in add user beer");
  }
}

export const addDeleteLike = (values, callback, userAuth) => async (dispatch) => {
  // console.log(values);
  console.log("trigger")
  try {
    const beerObj = {};
    beerObj.values = values;
    beerObj.userAuth = utils.stringChecker(userAuth.userinfo);
    let token = localStorage.getItem('token');
    const request = axios.post('/users/likes', beerObj, {
      headers: { Authorization: token }
    })
    .then((res) => {
      if(callback) {
        callback();
      }
    });
  dispatch({
    type: ADD_DELETE_LIKE,
    payload: request
  })
  }
  catch (e) {
    console.log("error in add user beer");
  }  
}

export const followUser = (userFollow, userInfo, cb) => async (dispatch) => {
  // console.log(userFollow, userInfo, cb);

  let values = {};
  values.userFollow = userFollow;
  values.userInfo = userInfo;

  try {
    const request = axios.post('/users/follows', values)
    // .then((res) => {
    //   if(cb) {
    //     cb();
    //   }
    // })
    let token = localStorage.getItem('token');

    dispatch({
      type: FOLLOW_USER,
      payload: request

    }) 
  }
  catch (e) {
    console.log("error follow user");
  }
}

export const unFollowUser = (values, cb) => async (dispatch) => {
  try {
    const request = axios.delete('/users/followuser', values)
    let token = localStorage.getItem('token');

    dispatch({
      type: FOLLOW_USER,
      payload: request

    }) 
  }
  catch (e) {
    console.log("error follow user");
  }
}


export const signup = (formProps, cb) => async (dispatch) => {
  console.log(formProps);
  try {
    const response = await axios.post('./users/signup', formProps)
    dispatch({
      type: AUTH_USER, payload: response.data.token
    })
    localStorage.setItem('token', response.data.token)
    cb();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Email or Username in use"
    })
  }
}

export const signin = (formProps, cb) => async (dispatch) => {
  try {
  const response = await axios.post('./users/signin', formProps)
  dispatch({ type: AUTH_USER, payload: response.data})
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('user', JSON.stringify(response.data.user));

  cb();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Invalid Login"
    })
  }
}

export const getUser = (userinfo, cb) => async (dispatch )=> {
  const id = userinfo._id;
  console.log(id);
  try {
    let token = localStorage.getItem('token');
    const request = axios.get(`/users/getuser/${id}`)
    dispatch({
       type: GET_USER, payload: request
    })
    cb();
    } catch (e) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Invalid Login"
      })
    }
}

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return {
    type: AUTH_USER,
    payload: ''
  }
}