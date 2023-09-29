import TeacherSchedule from "../../models/Schedule/TeacherSchedule.js";
import asyncHadler from "express-async-handler";
import _throw from "../../utils/_throw.js";

const teacherScheduleController = {
    register: asyncHadler(async( req, res) => {
        try {
            const existed = await TeacherSchedule.findOne({ start: req.body.start, end: req.body.end, weekday: req.body.weekday });
            if (existed) {
                return _throw({
                    code: 400,
                    message: "Schedule has already existed"
                })
            }
            const timeSchedule = new TeacherSchedule(req.body);
            await timeSchedule.save();
            res.status(200).json({
                status: true,
                message: "Schedule Created",
                timeSchedule,
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    })
}

export default teacherScheduleController