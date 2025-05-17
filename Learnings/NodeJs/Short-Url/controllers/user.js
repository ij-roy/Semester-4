const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth');


async function handleUserSignUp(req, res) {
  const {name,email,password} = req.body; 
  await User.create({name,email,password});
  return res.redirect('/');
}

async function handleUserLogin(req, res) {
  const {email,password} = req.body; 
  const user = await User.findOne({email,password});
  console.log(user);
  if(!user) {
    return res.render('login', {error: 'Invalid email or password'});
  }

  const token = setUser(user);
  res.cookie('token', token);
  // return res.redirect('/');
  return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}