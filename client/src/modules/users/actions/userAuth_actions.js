import axios from 'axios';
import * as utils from '../../../utils/utils.js';
export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';
export const LOG_OUT = 'log_out';

export const signup = (formProps, cb) => async (dispatch) => {
  try {
    const response = await axios.post('./users/signup', formProps)
    // console.log(response.data);
    dispatch({
      type: AUTH_USER, payload: response.data
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', response.data.user)
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
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user));
    dispatch({
      type: AUTH_USER, payload: response.data
    })
    cb();
    console.log(respsonse.data, "user data on singin");


  } catch (e) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Invalid Login"
      })
  }
}

export const signout = () => async(dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({
    type: LOG_OUT,
    payload: ''
  })
}