import ClassSession from "../../models/Class/ClassSession.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const classSessionController = {
    register: asyncHandler(async (req, res) => {
        const { date, classId, locationId, teacherInSession } = req.body;
        try {
            const existed = await ClassSession.findOne({
                date: date,
                classId: classId
            });
            if (existed) return _throw({
                code: 400,
                message: "Session has already existed"
            })
            let sessionDays = [];
            let sessionDate = new Date(date);
            let endDate = new Date(sessionDate);
            endDate.setDate(endDate.getDate() + 7 * 15);
            let startDayStr = sessionDate.toISOString().split('T')[0];
            let endDateStr = endDate.toISOString().split('T')[0];
            for (let i = 0; i < 16; i++) {
                sessionDays.push({
                    index: i + 1,
                    date: new Date(sessionDate)
                });
                sessionDate.setDate(sessionDate.getDate() + 7);
            }
            const classSession = await ClassSession.create({
                sessionNumber: 16,
                date: date,
                sessionDays: sessionDays,
                range: startDayStr + ' - ' + endDateStr,
                classId: classId,
                locationId: locationId,
                teacherInSession: teacherInSession
            })
            await classSession.save();
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

    getOne: asyncHandler(async(req, res) => {
        const { classId } = req.params; 
        try {
            const classSession = await ClassSession.findOne({ classId: classId });
            if(!classSession) return _throw({
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
    })
}

export default classSessionController;