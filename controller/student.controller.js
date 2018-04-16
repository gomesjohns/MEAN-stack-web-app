const courseModel = require("../model/course.model");
const studentModel = require("../model/student.model");

//Assign course to student
const assignCourse= function (req, res)
{
   const ret= {};

   courseModel.findById(req.params.courseId, function (err, retCourseObj) {
       if(err)
       {
           ret.msg= err.message;
           res.json({ret});
       }
       else if(retCourseObj ==null)
       {
           ret.msg="Course not found";
           res.json(ret);
       }
       else
       {
           studentModel.findById(req.params.id, function (err, retStuObj) {
               if(err)
               {
                   ret.msg= err.message;
                   res.json({ret});
               }
               else
               {
                   let courseFound =false;
                   let index= 0;

                   for(let i=0; i<retStuObj.courses.length; i++)
                   {
                       if(retStuObj.courses[i].code === retCourseObj.code)
                       {
                           courseFound =true;
                           index =i;
                           break;
                       }
                   }
                   let updateVal={};
                   if (courseFound)
                   {
                       updateVal={$pull:{'courses': retStuObj.courses[index]}};

                       studentModel.findByIdAndUpdate(req.params.id, updateVal, {upsert: true, new:true},
                           function (err, retStudentObj)
                           {
                               if (err)
                               {
                                   ret.msg = err.message;
                                   res.json(ret);
                               }
                               else
                               {
                                   updateStudentCourse(req, res, retCourseObj);
                               }
                           })
                   }
                   else {
                       updateStudentCourse(req, res, retCourseObj);
                   }
               }

           })
       }
   })
};

//Drop a course from student's course list
const dropCourse= function(req, res)
{
    const ret={};
    console.log("drop course function ran");
    let updateValues=
    {
        $pull: {'courses': {"_id": req.params.courseId}}
    };

    studentModel.findByIdAndUpdate(req.params.id, updateValues, {upsert: true}, function (err, retStudentObj)
    {
        if (err) {
            ret.msg = err.message;
            res.json(ret);
        }
        else {
            res.json(retStudentObj.courses);
        }
    });
};

//If student already has the course
const updateStudentCourse = function(req, res, retCourseObj)
{
    let updateVal={$push:{'courses': retCourseObj}};
    studentModel.findByIdAndUpdate(req.params.id, updateVal, {upsert: true, new:true},
        function (err, retStudentObj)
        {
            if (err)
            {
                ret.msg = err.message;
                res.json(ret);
            }
            else
            {
                res.json(retStudentObj.courses);
            }
        })
};

//Return a list of courses assigned to student
const getStudentCourses = function(req, res)
{
    const ret={};
    var msg=String;

    studentModel.findById(req.params.id, function (err, retStudentObj) {
        if(err)
        {
            ret.msg= err.message;
            res.json(ret);
        }
        if(!retStudentObj)
        {
            ret.msg= "Student not found";
            res.json(ret);
        }
        res.json(retStudentObj.courses);
        console.log(retStudentObj.courses);
    })
};


module.exports={'assignCourse': assignCourse, 'getStudentCourses': getStudentCourses, 'dropCourse': dropCourse};