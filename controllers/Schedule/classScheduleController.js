import TimeSchedule from "../../models/Schedule/TimeSchedule.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const classScheduleController = {
    register: asyncHandler(async (req, res) => {
        try {
            const existed = await TimeSchedule.findOne({ start: req.body.start, end: req.body.end, weekday: req.body.weekday });
            if (existed) {
                return _throw({
                    code: 400,
                    message: "Schedule has already existed"
                })
            }
            const timeSchedule = new TimeSchedule(req.body);
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
    }),

    getAll: asyncHandler(async (req, res) => {
        try {
            const timeSchedules = await TimeSchedule.find({});
            res.status(200).json({
                status: true,
                message: "Get all successfully",
                timeSchedules
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    })
}