import mongoose, { Schema } from "mongoose";

const bookTeacherSchema = new mongoose.Schema({
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    locationId: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true
    },
    teacherRegister: [{
        teacherId: {
            type: Schema.Types.ObjectId, 
            ref: 'Teacher'
        },
        status: {
            type: String,
            enum: ['WAITING', 'ACCEPTED', 'REJECTED']
        }
    }]
})

const BookTeacher = mongoose.model("BookTeacher", bookTeacherSchema);
export default BookTeacher;