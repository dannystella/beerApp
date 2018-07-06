import axios from 'axios';

export const FETCH_FEED = 'fetch_feed';
export const CREATE_COMMENT= 'create_comment';
export const DELETE_COMMENT = 'delete_comment';
export const UPDATE_COMMENT = 'update_comment';
// export const FETCH_COMMENTS= 'fetch_comments';
export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';

export function fetchFeed(userinfo) {
  if(typeof userinfo === 'string') {
    userinfo = JSON.parse(userinfo);
  }

  let username = userinfo.username;
  console.log(username);
    const request = axios.get('/users/getfeed', {headers: {username: username}})
    return {
      type: FETCH_FEED,
      payload: request
  }
}

export const createComment = (values, callback, id, trigger) => async(dispatch) => {
  try {
  const commentObj = {};
  commentObj.values = values;
  commentObj.id = id;
  commentObj.trigger = trigger;
  let token = localStorage.getItem('token')
  const request = axios.post('/users/addcomments', commentObj, {
    headers: { Authorization: token }
  })
  .then((res) => {
    console.log("user new comment", res);
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

export const deleteComment = (callback, commentInfo, beerId, trigger, userinfo) => async(dispatch) => {
  console.log(commentInfo)
  try {
  const params = {}
  params.beerId = beerId;
  params.trigger = trigger;
  params.userinfo = userinfo;
  params.commentId = commentInfo._id;
  let token = localStorage.getItem('token')
  console.log(commentInfo.streamData.id)
  const request = axios.delete(`/users/deletecomments/${commentInfo.streamData.id}`, {
    data: { Authorization: token, params: params }
  })
  .then((res) => {
    console.log("but")
    if(callback) {
      console.log("cb")
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

export const updateComment = (callback, comment, newComment, beerId, trigger) => async (dispatch) => {
  try {
  console.log(comment, "hit here")
  const params = {}
  params.beerId = beerId;
  params.trigger = trigger;
  params.comment = comment;
  params.newComment = newComment;
  let token = localStorage.getItem('token');
  console.log(params,  "updated comment");
  const request = axios.put(`/users/updatecomments/${comment._id}`, {
    data: { Authorization: token, params: params }
  })
  .then((res) => {
    // console.log(res, "HERE")
    if(callback) {
      console.log("cb")
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

export const signup = (formProps, cb) => async (dispatch) => {
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

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return {
    type: AUTH_USER,
    payload: ''
  }
}