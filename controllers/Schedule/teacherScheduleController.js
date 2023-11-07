import ClassSession from "../../models/Class/ClassSession.js"
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
                let sessionDates = session.sessionDays.map(day => ({
                    date: day.date,
                    start: session.time.start,
                    end: session.time.end
                }));
                allSessionDays.push(...sessionDates);
                // sort dates
                allSessionDays.sort(function(a,b){
                    return new Date(a.date) - new Date(b.date);
                });
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