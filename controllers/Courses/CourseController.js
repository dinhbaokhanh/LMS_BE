import Course from "../../models/Courses/Course.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const courseController = {
    register: asyncHandler(async (req, res) => {
        try {
            const existingCourse = await Course.findOne({ courseName: req.body.courseName });
            if (existingCourse) {
                _throw({
                    code: 400,
                    message: 'Course already exists'
                });
            }
            const course = new Course(req.body);
            await course.save();
            res.status(201).json({
                status: true,
                course
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    getOne: asyncHandler(async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            if (!course) {
                _throw({
                    code: 404,
                    message: 'Course not found'
                });
            }
            res.status(200).json(course);
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    getAll: asyncHandler(async (req, res) => {
        try {
            const courses = await Course.find({});
            if(courses.length < 1){
                _throw({
                    message: "There is no course"
                })
            }
            res.status(200).json({
                status: true,
                courses
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    getAllActivate: asyncHandler(async (req, res) => {
        try {
            const activatedCourses = await Course.find({ activate: true})
            res.status(200).json({
                status: true,
                activatedCourses
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    update: asyncHandler(async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            if (!course) {
                _throw({
                    code: 404,
                    message: 'Course not found'
                });
            }
            Object.assign(course, req.body);
            await course.save();
            res.status(200).json(course);
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    activate: asyncHandler(async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            if (!course) {
                return _throw({
                    code: 404,
                    message: "Course not found"
                })
            }
            if (course?.activate === true) {
                return _throw({
                    code: 400,
                    message: "Course has already activated"
                })
            }
            course.activate = true;
            await course.save();
            res.status(200).json({
                status: true,
                message: "Course Activated",
                course
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    deactivate: asyncHandler(async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            if (!course) {
                return _throw({
                    code: 404,
                    message: "Course not found"
                })
            }
            if (course?.activate === false) {
                return _throw({
                    code: 400,
                    message: "Course has already deactivated"
                })
            }
            course.activate = false;
            await course.save();
            res.status(200).json({
                status: true,
                message: "Course Deactivated",
                course
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    delete: asyncHandler(async (req, res) => {
        try {
            const course = await Course.findByIdAndDelete(req.params.id);
            if (!course) {
                _throw({
                    code: 404,
                    message: 'Course not found'
                });
            }
            res.status(200).json({ message: 'Course deleted' });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    })
};

export default courseController;