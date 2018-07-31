export const stringChecker = (userinfo) => {
  try {

  
  if(typeof userinfo === 'string') {
    userinfo = JSON.parse(userinfo);
  } else {
    userinfo = userinfo
  }
  return userinfo;
  }
  catch(e) {
    return userinfo
  }
}