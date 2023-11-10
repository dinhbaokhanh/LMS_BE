import BookTeacher from "../../models/Class/bookTeacher.js";
import ClassSession from "../../models/Class/ClassSession.js";
import Class from "../../models/Class/Class.js";
import TeacherSchedule from "../../models/Schedule/TeacherSchedule.js";
import Teacher from "../../models/Teacher/teacher.js"
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const bookTeacherController = {

    registerForClass: asyncHandler(async (req, res) => {
        const { teacherEmail, classId } = req.body;
        const teacher = await Teacher.find({ email: teacherEmail });
        const teacherId = teacher[0]._id;
        const bookTeacher = await BookTeacher.findOne({ classId });
        if (!bookTeacher) {
            return res.status(404).json({ message: 'Class not found' });
        }
        try {
            const existingRegistration = bookTeacher.teacherRegister.find(reg => reg.teacherId.toString() === teacherId.toString());
            if (existingRegistration) {
                return res.status(400).json({ message: 'This teacher has already registered for this class' });
            }
            bookTeacher.teacherRegister.push({ teacherId: teacherId, status: 'WAITING' });
            await bookTeacher.save();
            res.status(201).json({
                message: 'Registered for class successfully',
                bookTeacher
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    getAllRegistration: asyncHandler(async (req, res) => {
        const classId = req.params.classId;
        try {
            const bookTeacher = await BookTeacher.find({ classId });
            console.log(bookTeacher);
            if (!bookTeacher) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.status(200).json({
                message: "Get All Registration Successfully",
                bookTeacher
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    acceptRegistration: asyncHandler(async (req, res) => {
        const { classId, teacherId } = req.params;
        const bookTeacher = await BookTeacher.findOne({ classId });
        if (!bookTeacher) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const registration = bookTeacher.teacherRegister.find(reg => reg.teacherId.toString() === teacherId);
        if (registration.status === "ACCEPTED") {
            return res.status(404).json({ message: 'Teacher had been accepted' });
        }
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        registration.status = "ACCEPTED";

        const classSession = await ClassSession.findOne({ classId: classId });
        if (!classSession) {
            return res.status(404).json({ message: 'Class session not found' });
        }

        const teacherSchedule = new TeacherSchedule({
            teacherId: teacherId,
            classSessionId: classSession._id,
        });
        await teacherSchedule.save();

        const openClass = await Class.findByIdAndUpdate(classId,
            {
                status: "RUNNING"
            }                
        )
        await openClass.save()

        for (var i = 0; i < 16; i++) {
            classSession.sessionDays[i].teacherInSession.push({
                teacherId: teacherId,
                role: 'None',
                active: false,
                isReplaceTeacher: false
            })
        }

        await classSession.save();

        await bookTeacher.save();
        res.status(200).json({
            message: 'Registration accepted successfully',
            bookTeacher
        });
    }),

    rejectRegistration: asyncHandler(async (req, res) => {
        const { classId, teacherId } = req.params;
        const bookTeacher = await BookTeacher.findOne({ classId });
        if (!bookTeacher) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const registration = bookTeacher.teacherRegister.find(reg => reg.teacherId.toString() === teacherId);
        if (registration.status === "REJECTED") {
            return res.status(404).json({ message: 'Teacher had been rejected' });
        }
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        registration.status = "REJECTED";
        await bookTeacher.save();
        res.status(200).json({
            message: 'Registration rejected successfully',
            bookTeacher
        });
    }),

    roleRegistration: asyncHandler(async (req, res) => {
        const { classId } = req.params;
        const { teacherId, role } = req.body;
        const bookTeacher = await BookTeacher.findOne({ classId });
        const classSession = await ClassSession.findOne({ classId: classId });
        if (!classSession) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const registration = bookTeacher.teacherRegister.find(reg => reg.teacherId.toString() === teacherId);
        if (!registration) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        for (let i = 0; i < classSession.sessionDays.length; i++) {
            for (let j = 0; j < classSession.sessionDays[i].teacherInSession.length; j++){
                if (classSession.sessionDays[i].teacherInSession[j].teacherId == teacherId) {
                    classSession.sessionDays[i].teacherInSession[j].role = role;
                }
            }
        }

        await classSession.save();

        await bookTeacher.save();
        res.status(200).json({
            message: 'Registration accepted successfully',
            classSession
        });
    })
}

export default bookTeacherController