import asyncHandler from "express-async-handler";
import Teacher from "../../models/Teacher/teacher.js"
import _throw from "../../utils/_throw.js";

const TeacherController = {
    getAll: asyncHandler(async (req, res) => {
        try {
            const teachers = await Teacher.find({});
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