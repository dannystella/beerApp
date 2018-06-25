import axios from 'axios';

export const CREATE_COMMENT= 'create_comment';
export const DELETE_COMMENT = 'delete_comment';
export const UPDATE_COMMENT = 'update_comment';
// export const FETCH_COMMENTS= 'fetch_comments';
export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';


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

export const deleteComment = (callback, commentId, beerId, trigger) => async(dispatch) => {
  try {
  const params = {}
  params.beerId = beerId;
  params.trigger = trigger;
  let token = localStorage.getItem('token')
  const request = axios.delete(`/users/deletecomments/${commentId}`, {
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
    console.log("error in delete comment");
  }
}

export const updateComment = (callback, comment, newComment, beerId, trigger) => async (dispatch) => {
  try {
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