import axios from 'axios';
import * as utils from '../../../utils/utils.js';

export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';

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
  dispatch({
     type: AUTH_USER, payload: response.data
  })
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