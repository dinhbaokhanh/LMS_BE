import asyncHandler from "express-async-handler";
import Teacher from "../../models/Teacher/teacher.js"
import _throw from "../../utils/_throw.js";

const TeacherController = {
    getAll: asyncHandler(async (req, res) => {
        try {
            const { status, subject, area, joinDate, name, email, phone } = req.query;
            let query = {};
            if (status) query.status = status;
            if (subject) query.subject = subject;
            if (area) query.area = area;
            if (joinDate) query.joinDate = { $gte: new Date(joinDate) };
            if (name) query.name = { $regex: name, $options: 'i' };
            if (email) query.email = { $regex: email, $options: 'i' };
            if (phone) query.phone = { $regex: phone, $options: 'i' };
            const teachers = await Teacher.find(query);
            res.status(200).json({
                status: true,
                message: "Get all teachers successfully",
                teachers
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    getOne: asyncHandler(async (req, res) => {
        try {
            const teacher = await Teacher.findById(req.params.id);
            if (!teacher) {
                return res.status(404).json({
                    status: false,
                    message: "Teacher not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "Get teacher successfully",
                teacher
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    update: asyncHandler(async (req, res) => {
        try {
            const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!teacher) {
                return res.status(404).json({
                    status: false,
                    message: "Teacher not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "Teacher updated successfully",
                teacher
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    delete: asyncHandler(async (req, res) => {
        try {
            const teacher = await Teacher.findByIdAndDelete(req.params.id);
            if (!teacher) {
                return res.status(404).json({
                    status: false,
                    message: "Teacher not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "Teacher deleted successfully",
                teacher
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    })
}

export default TeacherController;