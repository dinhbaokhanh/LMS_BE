import mongoose, { Schema } from "mongoose";

const bookTeacherSchema = new mongoose.Schema({
    classId: {
        tyoe: Schema.Types.ObjectId,
        ref: "Class"
    },
    locationId: {
        type: Schema.Types.ObjectId,
        ref: "Location"
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