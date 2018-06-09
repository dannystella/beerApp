import axios from 'axios';

export const CREATE_COMMENT= 'create_comment';
export const FETCH_COMMENTS= 'fetch_comments';
export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';

export function createComment(values, callback) {
  console.log(values);
  const request = axios.post('/addcomments', values).then((res) => {
    if(callback) {
      callback();
    }
  });

  return {
    type: CREATE_COMMENT,
    payload: request
  }  
}

export function fetchComments() {
  const request = axios.get('/beers')

  return {
    type: FETCH_COMMENTS,
    payload: request
  }
}

export const signup = (formProps, cb) => async (dispatch) => {
  try {
  const response = await axios.post('./users/signup', formProps)
  console.log("also hit");
  dispatch({ type: AUTH_USER, payload: response.data.token})
  cb();
  } catch (e) {
    console.log("hit");
    dispatch({
      type: AUTH_ERROR,
      payload: "Email or Username in use"
    })
  }
}