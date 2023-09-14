import mongoose from "mongoose";

const teacherScheduleSchema = new mongoose.Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    },
    classSessionId:{
        type : Schema.Types.ObjectId , 
        ref : "ClassSession"
    }
});

const TeacherSchedule = mongoose.model("TeacherSchedule", teacherScheduleSchema);
export default TeacherSchedule;