export const stringChecker = (userinfo) => {
  if(typeof userinfo === 'string') {
    userinfo = JSON.parse(userinfo);
  } else {
    userinfo = userinfo
  }
  return userinfo;
}