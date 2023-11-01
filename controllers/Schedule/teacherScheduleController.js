import ClassSession from "../../models/Class/ClassSession.js"
import TimeSchedule from "../../models/Schedule/TimeSchedule.js";
import asyncHadler from "express-async-handler";
import _throw from "../../utils/_throw.js";

const teacherScheduleController = {
    generateTeacherSchedule: asyncHadler(async(req, res) => {
        const teacherId = req.params.teacherId;
        try {
            const classSessions = await ClassSession.find({"teacherInSession.teacherId": teacherId}).populate('time');;
            if (!classSessions.length) {
                return _throw({
                    code: 404,
                    message: "This teacher doesn't have any class"
                });
            }
            let allSessionDays = [];
            for (let session of classSessions) {
                const timeSchedule = await TimeSchedule.find({ _id: session.time });
                console.log(timeSchedule);
                let sessionDates = session.sessionDays.map(day => ({
                    date: day.date,
                    // start: timeSchedule.start,
                    // end: timeSchedule.end
                }));
                allSessionDays.push(...sessionDates);
            }
            return res.status(200).json({ 
                message: 'Schedule created successfully',
                sessionDays: allSessionDays
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })            
        }
    })
}

export default teacherScheduleController;