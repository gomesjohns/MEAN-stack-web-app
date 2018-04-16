const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({extended:false});
const authController= require('../controller/account.controller');


//Register
router.post('/register', authController.register);

//Login
router.route('/login').post(authController.login);

//Logout
router.get('/logout', authController.logout);

module.exports=router;