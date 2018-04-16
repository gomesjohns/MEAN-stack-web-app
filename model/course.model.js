const mongoose = require ('mongoose');
const schema = mongoose.Schema;

//Create a schema
const courseSchema= new schema
({
    code:
    {
        type:String,
        required: true,
    },
    name:
    {
        type:String,
        required: true,
    },
    section:
    {
        type:String,
        required:true,
    },
    semester:
    {
        type:String,
        required:true,
    }
},
{
    collection: "courses"
});

const Course = mongoose.model("courses", courseSchema);

module.exports= Course;