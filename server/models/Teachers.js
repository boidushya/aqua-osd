const mongoose = require("mongoose");
const Assignments = require("./Assignments");
const schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema.Types;

const teacherSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: [true, "Please enter a phone number"],
        match: [
            /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
            "Please enter a valid phone number",
        ],
    },
    email: {
        type: String,
        required: [true, "Please enter an email!"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        min: [6, "Password should be of atleast 6 charachters"],
    },
    course:{
        type:String,
        ref:"Courses"
    },
    assignments: [
        {
            type: ObjectId,
            ref: "Assignments",
        },
    ],
    exams:[
        {
            type:ObjectId,
            ref:"Exams"
        }
    ],
    type: {
        type: String,
        default: "teacher",
    }
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
