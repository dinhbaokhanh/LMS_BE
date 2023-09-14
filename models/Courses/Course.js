import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    id: String,
    courseName: {
        type: String,
        required: true,
    },
    activate: Boolean,
})

const Course = mongoose.model("Courses", courseSchema);
export default Course;