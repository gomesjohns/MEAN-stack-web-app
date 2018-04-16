const express = require('express');
const router = express.Router();
const courseController= require('../controller/course.controller');
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false});


//Add student to courses
router.get('/all-course', courseController.getAllCourses);


module.exports=router;