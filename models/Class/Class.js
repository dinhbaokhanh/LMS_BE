import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    codeClass: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    status: {
        type: String,
        enum: ["RUNNING", "PREOPEN", "DROP"],
        required: true
    },
    courseLevelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseLevel',
        required: true
    },
    timeSchedule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSchedule',
        required: true
    }],
    bookTeacherId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookTeacher',
    }]
})

const Class = mongoose.model("Classes", ClassSchema)
export default Class;