import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    id: String,
    codeClass: String,
    dayRange: {
        start: Date,
        end: Date,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    status: {
        type: String,
        enum: ["RUNNING", "PREOPEN", "DROP"]
    },
    courseLevelId: {
        type: Schema.Types.ObjectId, 
        ref: 'CourseLevel'
    },
    timeSchedule: [{
        type: Schema.Types.ObjectId, 
        ref: 'TimeSchedule'
    }],
    bookTeacherId: [{
        type: Schema.Types.ObjectId, 
        ref: 'BookTeacher'
    }]
})

const Class = mongoose.model("Classes", ClassSchema)
export default Class;