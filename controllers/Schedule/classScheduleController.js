import TimeSchedule from "../../models/Schedule/TimeSchedule.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const classScheduleController = {
    register: asyncHandler(async (req, res) => {
        const { start, end, weekday } = req.body
        try {
            const existed = await TimeSchedule.findOne({ start: start, end: end, weekday: weekday });
            if (existed) {
                return _throw({
                    code: 400,
                    message: "Schedule has already existed"
                })
            }
            const timeSchedule = await TimeSchedule.create({
                start: start, 
                end: end, 
                weekday: weekday,
                activated: false
            });
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

    getOne: asyncHandler(async(req, res) => {
        try {
            const timeSchedule = await TimeSchedule.findById(req.params.id);
            if (!timeSchedule) {
                _throw({
                    code: 404,
                    message: 'Course not found'
                });
            }
            res.status(200).json(timeSchedule);
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
    }),

    activate: asyncHandler(async(req, res) => {
        try {
            const schedule = await TimeSchedule.findById(req.params.id);
            if(!schedule){
                _throw({
                    code: 404,
                    message: "Schedule not found"
                })
            }
            if(schedule?.activated === true){
                _throw({
                    code: 400,
                    message: "Schedule has already activated"
                })
            }
            schedule.activated = true;
            await schedule.save();
            res.status(200).json({
                status: true,
                message: "Schedule is activated",
                schedule
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    deactivate: asyncHandler(async(req, res) => {
        try {
            const schedule = await TimeSchedule.findById(req.params.id);
            if(!schedule){
                _throw({
                    code: 404,
                    message: "Schedule not found"
                })
            }
            if(schedule?.activated === false){
                _throw({
                    code: 400,
                    message: "Schedule has already deactivated"
                })
            }
            schedule.activated = false;
            await schedule.save();
            res.status(200).json({
                status: true,
                message: "Schedule is deactivated",
                schedule
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    update: asyncHandler(async(req, res) => {
        try {
            const schedule = await TimeSchedule.find(req.params.id);
            if(!schedule){
                _throw({
                    code: 404,
                    message: "Schedule not found"
                })
            }
            Object.assign(schedule, req.body);
            await schedule.save();
            res.status(200).json(schedule);
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),
    
    delete: asyncHandler(async(req, res) => {
        try {
            const schedule = await TimeSchedule.findByIdAndDelete(req.params.id);
            if(!schedule){
                return res.status(404).json({
                    status: true,
                    message: "Schedule not found"
                })
            }
            res.status(200).json({
                status: true,
                message: "Schedule deleted successfully",
                schedule
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    })
}

export default classScheduleController