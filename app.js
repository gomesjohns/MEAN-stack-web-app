const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const course = require('./model/course.model');
const student = require('./model/student.model');
const passport = require('passport');
const session = require('express-session');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Setting environment variable
const env = process.env.DEPLOY || "dev";
const conf=require('./config/'+env+".json");

const app = express();

// Set up express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Adding express middleware to serve the static page - e.g style.css
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to be ejs engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Passport
require('./config/passport')(passport); // pass passport for configuration
app.use(session({secret: "secret@2018", saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, responseType");
    next();
});

// Create the database connection 
mongoose.connect(conf.dburl);
const accountRoute = require('./routes/account.route');
const courseRoute = require('./routes/course.route');
const studentCourseRoute = require('./routes/student.route');

//Route
app.use('/account', accountRoute);
app.use('/course', courseRoute);
app.use('/student', studentCourseRoute);
app.get('*', function(req, res)
{
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
});


app.listen(conf.port);
console.log("Application started on port ", conf.port);