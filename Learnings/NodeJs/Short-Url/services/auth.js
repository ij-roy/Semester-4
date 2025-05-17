// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "mysecret";

function setUser( user) {
  // sessionIdToUserMap.set(id, user);
  return jwt.sign({
    id: user._id,
    email: user.email,
    role: user.role
  },secret)
}

function getUser(token) {
  if(!token) return null;
  try {
    return jwt.verify(token, secret);
  }
  catch(e) {
    return null;
  }
}

module.exports = {
    setUser,
    getUser
}