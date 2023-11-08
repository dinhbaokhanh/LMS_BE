import ClassSession from "../../models/Class/ClassSession.js";
import BookTeacher from "../../models/Class/bookTeacher.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const classSessionController = {
    register: asyncHandler(async (req, res) => {
        const { date, time, classId, locationId, teacherInSession, document } = req.body;
        try {
            const existed = await ClassSession.findOne({
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
                sessionDays.push({
                    index: i + 1,
                    date: new Date(sessionDate),
                    teacherInSession
                });
            }

            const classSession = await ClassSession.create({
                sessionNumber: 16,
                date: date,
                document: document,
                sessionDays: sessionDays,
                time: time,
                range: startDateStr + ' - ' + endDateStr,
                classId: classId,
                locationId: locationId,
            })
            await classSession.save();
            if (classSession) {
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

    getAll: asyncHandler(async (req, res) => {
        const classSessions = await ClassSession.find({});
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
    }),

    delete: asyncHandler(async (req, res) => {
        const { classId } = req.params;
        const classSessions = await ClassSession.findOneAndDelete({ classId });
        try {
            res.status(200).json({
                message: "Class Sessions Deleted",
                classSessions,
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    checkAttendance: asyncHandler(async (req, res) => {
        const { classId } = req.params;
        const classSession = await ClassSession.find({ classId: classId })
        console.log(classSession[0]);
        if (!classSession) {
            return res.status(404).json({
                message: "Class session not found",
                classSession,
            })
        }
        try {
            const { index, teacherId } = req.body;
            for (var i = 0; i < 16; i++) {
                if (classSession[0].sessionDays[i].index == index) {
                    for (var j = 0; j < classSession[0].sessionDays[i].teacherInSession.length; j++) {
                        if (classSession[0].sessionDays[i].teacherInSession[j].teacherId == teacherId
                            && classSession[0].sessionDays[i].teacherInSession[j].isReplaceTeacher === false) {
                            classSession[0].sessionDays[i].teacherInSession[j].active = true;        
                        }
                    }
                }
            }
            res.status(200).json({
                message: "Checked Attendance",
                classSession,
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