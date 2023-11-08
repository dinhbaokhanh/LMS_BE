import mongoose from "mongoose";

const classSessionSchema = new mongoose.Schema({
    sessionNumber: Number,
    date: {
        type: Date,
        required: true
    },
    range: String,
    document: {
        type: String,
        required: true
    },
    time: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSchedule',
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }, 
    sessionDays: [{
        index: Number,
        date: Date,
        teacherInSession: [{
            teacherId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Teacher'
            },
            role: {
                type: String,
                enum: ["Teacher", "Mentor", "None"],
                default: "None"
            },
            active: Boolean,
            isReplaceTeacher: Boolean
        }]
    }],
});

const ClassSession = mongoose.model("ClassSession", classSessionSchema);
export default ClassSession;