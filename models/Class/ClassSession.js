import mongoose from "mongoose";

const classSessionSchema = new mongoose.Schema({
    sessionNumber: Number,
    date: Date,
    document: Object,
    classId: {
        type: Schema.Types.ObjectId, 
        ref: 'Class'
    },
    locationId: {
        type: Schema.Types.ObjectId, 
        ref: 'Location'
    },
    teacherInSession: [{
        teacherId: {
            type: Schema.Types.ObjectId, 
            ref: 'Teacher'
        },
        role: String,
        active: Boolean,
        isReplaceTeacher: Boolean
    }]
});

const ClassSession = mongoose.model("ClassSession", classSessionSchema);
export default ClassSession;