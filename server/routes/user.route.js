
const passport = require('passport')
module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const {_, auth} = require('../middlewares/user');

  var router = require("express").Router();

  router.post("/signup", users.signup);

  router.post("/login", users.login);

  router.get('/users', users.getAllUsers);

  router.post("/changepassword", auth, users.changepassword);

  router.post("/verifypassword", auth, users.verifypassword);

  router.post('/google-login', users.googleLogin);

  router.get('/users', users.getAllUsers);


  app.use('/api/auth', router);
};