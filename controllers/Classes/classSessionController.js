import ClassSession from "../../models/Class/ClassSession.js";
import BookTeacher from "../../models/Class/bookTeacher.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const classSessionController = {
    register: asyncHandler(async (req, res) => {
        const { date, timeScheduleId, classId, locationId, teacherInSession, document } = req.body;
        try {
            const existed = await ClassSession.findOne({
                date: date,
                classId: classId
            });
            if (existed) return _throw({
                code: 400,
                message: "Session has already existed"
            })

            var startDate = new Date(date); // mm/dd/yyyy
            var startDateStr = startDate.toDateString();

            // Generate the end date (16 weeks later)
            var endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 16 * 7);
            var endDateStr = endDate.toDateString();

            var sessionDays = [];
            for (var i = 0; i < 16; i++) {
                var sessionDate = new Date(startDate);
                sessionDate.setDate(sessionDate.getDate() + i * 7);
                sessionDays.push({ index: i+1, date: new Date(sessionDate) });
            }

            const classSession = await ClassSession.create({
                sessionNumber: 16,
                date: date,
                document: document,
                sessionDays: sessionDays,
                timeSchedule: timeScheduleId,
                range: startDateStr + ' - ' + endDateStr,
                classId: classId,
                locationId: locationId,
                teacherInSession: teacherInSession
            })
            await classSession.save();
            if(classSession){
                const bookTeacher = await BookTeacher.create({
                    classId,
                    locationId,
                })
                await bookTeacher.save();
            }
            res.status(200).json({
                status: true,
                message: "Sessions created",
                classSession,
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    getOne: asyncHandler(async (req, res) => {
        const { classId } = req.params;
        try {
            const classSession = await ClassSession.findOne({ classId: classId });
            if (!classSession) return _throw({
                code: 404,
                message: "Class session not found"
            })
            res.status(200).json({
                status: true,
                message: "Class session retrieved",
                classSession,
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    getAll: asyncHandler(async(req, res) => {
        const classSessions = await ClassSession.find();
        try {
            res.status(200).json({
                message: "All Class Sessions",
                classSessions,
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    })
}

export default classSessionController;