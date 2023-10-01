import mongoose from "mongoose";

const timeScheduleSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    weekday: {
        type: String,
        required: true
    },
    activated: Boolean,
});

const TimeSchedule = mongoose.model('TimeSchedule', timeScheduleSchema);
export default TimeSchedule;