const express = require('express');
const router = express.Router();
const studentController= require('../controller/student.controller.js');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended:false});

//Return a list of courses assigned to student
router.get('/student-course-list/:id', studentController.getStudentCourses);

//Assign course to student
router.get('/add-course/:id/:courseId', studentController.assignCourse);

//Drop a course from student's course list
router.get('/drop-course/:id/:courseId', studentController.dropCourse);

module.exports=router;