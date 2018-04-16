const studentModel=require("../model/student.model");
const jwt= require('jsonwebtoken');
const passport = require('passport');
const tokenSecret= 'comp308-assignment3';

/* ===============================================
    Register route, insert user into database
  ================================================*/
const register= function (req, res)
{
    const ret = {};
    const student= new studentModel(req.body);
    console.log("First Name: "+req.body.firstName, "Last Name: "+req.body.lastName);
    student.save(function (err, retObj)
    {
        if (err)
        {
            ret.msg= err.message;
            res.json({ret});
            console.log(err)
        }
        else
        {
            res.json(retObj);
        }
    });
};

/* ===============================================
    Login route, authenticate user
  ================================================*/
const login= function(req, res, next)
{
    passport.authenticate('local', function(err, user, info)
    {
        res.set('Access-Control-Allow-Origin', '*');
        if (err) // If error
        {
            return next(err);
        }
        if (!user) // No user found
        {
            return res.json({'user': null});
        }
        req.login(user, function (err)
        {
            if (err)
            {
                res.send(err);
            }
            res.json({'userId': user.id, 'userName': user.firstName+" "+user.lastName, 'userEmail': user.email, 'studentNum': user.studentNumber});
            console.log(user.email+" has logged in");
        });
        
    })(req, res, next);
};

const logout=function(req, res, next)
{
    req.logOut();
    res.json("You have been logged out");
}


module.exports= {"register": register, "login": login, "logout": logout};