import mongoose from "mongoose";

const classSessionSchema = new mongoose.Schema({
    sessionNumber: Number,
    date: {
        type: Date,
        required: true
    },
    sessionDays: [{
        index: Number,
        date: Date,
    }],
    document: {
        type: String,
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
    teacherInSession: [{
        teacherId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Teacher'
        },
        role: String,
        active: Boolean,
        isReplaceTeacher: Boolean
    }]
});

const ClassSession = mongoose.model("ClassSession", classSessionSchema);
export default ClassSession;