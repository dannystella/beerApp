import axios from 'axios';
import * as utils from '../../../utils/utils.js';
import s3 from '../../../config';
// import request from 'request';
export const ADD_USERBEER = 'add_userbeer';
export const DELETE_USERBEER = 'delete_userbeer';
export const ADD_DELETE_LIKE = 'add_delete_like';
export const FOLLOW_USER = 'follow_user';
export const ADD_AVATAR = 'add_avatar';


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
  var newBeerInfo;
  try {
    const beerObj = {};
    beerObj.values = values;
    beerObj.userinfo = userinfo;
    let token = localStorage.getItem('token');
    const request = axios.post('/users/addbeers', beerObj, {
      headers: { Authorization: token }
    })
    .then((res) => {
      newBeerInfo = res;
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
    console.log("error in add user beer", e);
  }
}

export const addDeleteLike = (values, callback, userAuth) => async (dispatch) => {
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
    console.log("error in likes");
  }  
}

export const followUser = (userFollow, userInfo, cb) => async (dispatch) => {
  let values = {};
  values.userFollow = userFollow;
  values.userInfo = userInfo;
  let token = localStorage.getItem('token');
  try {
    const request = await axios.post('/users/follows', values)
    localStorage.setItem('user', JSON.stringify(request.data));
    dispatch({
      type: FOLLOW_USER,
      payload: request.data
    }) 
    if (cb) {
      cb();
    }
  }
  catch (e) {
    console.log("error follow user");
  }
}

export const addAvatar = (image, creds, streamData) => async (dispatch) => {
  let formData = new FormData();
  let imagefile = document.querySelector('#file-input').files[0];
  let postObj = {};
  postObj.creds = creds;
  formData.append("userinfo", JSON.stringify(postObj));
  formData.append("image", imagefile);
  console.log(formData.image);
  axios.post('/users/addbeerpicture', formData, 
  { 
  // headers: {
  //   'Content-Type': false,
  // }
}).then((res) => {
  console.log(res);
    // axios.get(s3.baseUrl + `${creds._id}.jpg`).then((data) => {
    //   console.log(data);
    // })    
  })
}
