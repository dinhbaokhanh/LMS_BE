import mongoose from "mongoose";

const timeScheduleSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    weekday: String,
    activated: Boolean
});

const TimeSchedule = mongoose.model('TimeSchedule', timeScheduleSchema);
export default TimeSchedule;