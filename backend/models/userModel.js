const mongoose = require("mongoose");

//Task schema
const taskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
        type:String
    },
    date:{
        type: Date
    },
    link:{
        type: String
    }
});



//Course schema
const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    tasks:[taskSchema]
})



//Section schema
const sectionSchema = new mongoose.Schema({
    name:{
        type: String, 
        unique: true,
        required: true
    },
    courses: [courseSchema]
})

// Create models
const Task = mongoose.model('Task', taskSchema);
const Course = mongoose.model('Course', courseSchema);
const Section = mongoose.model('Section', sectionSchema);

module.exports = { Task, Course, Section };
