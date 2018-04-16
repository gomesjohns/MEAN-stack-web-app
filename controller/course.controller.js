const studentModel=require("../model/student.model");
const courseModel=require("../model/course.model");

//Return all the courses in database
const getAllCourses= function(req, res, next)
{
    const ret = {};
    courseModel.find({}, function (err, courseObj)
    {
        if (err)
        {
            ret.msg = err.message;
            res.json({ ret });
        }
        if(!courseObj)
        {
            ret.msg = "No course found";
            console.log(ret.msg);
            res.json({ ret });
        }
        res.json(courseObj);
    })
};

module.exports={'getAllCourses': getAllCourses};