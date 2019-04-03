import axios from 'axios';
import * as utils from '../../../utils/utils.js';

export const FETCH_FEED = 'fetch_feed';
export const FETCH_USERS = 'fetch_users';
export const FETCH_USER = 'fetch_user';
export const AUTH_ERROR = 'auth_error';

export function fetchFeed(userinfo) {
  userinfo = utils.stringChecker(userinfo);
  if (userinfo === null) {
    return {
      type: AUTH_ERROR,
      payload: 'auth error'
    };
  }
  let username = userinfo.username;
  const request = axios.get('/users/getfeed', { headers: { username: username } })
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