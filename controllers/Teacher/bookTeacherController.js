import BookTeacher from "../../models/Teacher/bookTeacher.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const bookTeacherController = {
    registerForClass: asyncHandler(async (req, res) => {
        const { teacherId, locationId, classId } = req.body;
        try {
            const bookTeacher = await BookTeacher.findOne({ classId });
            if (!bookTeacher) {
                return res.status(404).json({ message: 'Class not found' });
            }
            const existingRegistration = bookTeacher.teacherRegister.find(reg => reg.teacherId.toString() === teacherId);
            if (existingRegistration) {
                return res.status(400).json({ message: 'This teacher has already registered for this class' });
            }
            bookTeacher.teacherRegister.push({ teacherId, locationId, status: 'WAITING' });
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

    acceptRegistration: asyncHandler(async (req, res) => {
        const { classId, teacherId } = req.body;
        const bookTeacher = await BookTeacher.findOne({ classId });
        if (!bookTeacher) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const registration = bookTeacher.teacherRegister.find(reg => reg.teacherId.toString() === teacherId);
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        registration.status = "ACCEPTED";
        await bookTeacher.save();
        res.status(200).json({
            message: 'Registration accepted successfully',
            bookTeacher
        });
    }),

    rejectRegistration: asyncHandler(async (req, res) => {
        const { classId, teacherId } = req.body;
        const bookTeacher = await BookTeacher.findOne({ classId });
        if (!bookTeacher) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const registration = bookTeacher.teacherRegister.find(reg => reg.teacherId.toString() === teacherId);
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
}

export default bookTeacherController