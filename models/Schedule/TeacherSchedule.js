import mongoose from "mongoose";

const teacherScheduleSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    classSessionId:{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "ClassSession",
    }
});

const TeacherSchedule = mongoose.model("TeacherSchedule", teacherScheduleSchema);
export default TeacherSchedule;