const mongoose = require ('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// const courseModel = require("../model/course.model");

const courseModel = mongoose.model("courses").schema;

//Create a schema
const studentSchema= new schema( {

    email:
    {
        type:String,
        required:true,
        unique: true,
        lowercase: true,
    },
    password:
    {
        type:String,
        required: true,
        minlength:6,
    },
    firstName:
    {
        type:String,
        required: true,
    },
    lastName:
    {
        type:String,
        required:true,
    },
    
    phone:
    {
        type:String,
        required:true,
    },
    studentNumber:
    {
        type:String,
        required: true,
    },
    program:
    {
        type:String,
        required:true,
    },
    address:
    {
        type:String,
        required:true,
    },
    city:
    {
        type:String,
        required:true,
    },
    courses: [{
        type: courseModel,
        ref: 'courses',
        unique: true
    }]
},
{
    collection: "students"
});


// Schema Middleware tp Encrypt Password
studentSchema.pre('save', function (next)
{
    //Ensure password is new or modified before applying encryption
    if (!this.isModified('password'))
    {
        return next();
    }
    //Apply encryption
    bcrypt.hash(this.password, null, null, (err, hash) =>
    {
        if(err) return next(err);//Ensure no errors
        this.password = hash; //Apply encryption to password
        next(); //Exit middleware
    });
});

//Method to compare password to encrypted password upon login
studentSchema.methods.comparePassword= function (password)
{
    return bcrypt.compareSync(password, this.password); //Return comparison of login pass ro pass in database (true or false)
};


//Create a model
const Student= mongoose.model("student", studentSchema);

//Export the model
module.exports=Student;