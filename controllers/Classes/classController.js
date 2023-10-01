import Class from "../../models/Class/Class.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const classController = {
    register: asyncHandler(async (req, res) => {
        const { codeClass, courseId, courseLevelId, timeSchedule } = req.body;
        const existingClass = await Class.findOne({ codeClass });
        if (existingClass) {
            return res.status(400).json({ message: 'Class with this codeClass already exists' });
        }
        try {
            const newClass = await Class.create({
                codeClass,
                courseId,
                status: "PREOPEN",
                courseLevelId,
                timeSchedule,
                bookTeacherId,
            });
            const savedClass = await newClass.save();
            res.status(201).json({
                message: 'Class registered successfully',
                savedClass
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    getAll: asyncHandler(async (req, res) => {
        try {
            const classes = await Class.find({});
            res.status(200).json({
                message: 'Classes fetched successfully',
                classes
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    getOne: asyncHandler(async (req, res) => {
        const { id } = req.params;
        try {
            const classDetail = await Class.findById(id);
            if (!classDetail) {
                return res.status(404).json({
                    message: 'Class not found',
                });
            }
            res.status(200).json({
                message: 'Class detail fetched successfully',
                classDetail
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    update: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { codeClass, courseId, courseLevelId, status, timeSchedule, bookTeacherId } = req.body;
        try {
            const classDetail = await Class.findById(id);
            if (!classDetail) {
                return res.status(404).json({
                    message: 'Class not found',
                });
            }
    
            classDetail.codeClass = codeClass || classDetail.codeClass;
            classDetail.courseId = courseId || classDetail.courseId;
            classDetail.courseLevelId = courseLevelId || classDetail.courseLevelId;
            classDetail.status = status || classDetail.status;
            classDetail.timeSchedule = timeSchedule || classDetail.timeSchedule;
            classDetail.bookTeacherId = bookTeacherId || classDetail.bookTeacherId;
    
            if (status === 'RUNNING' && classDetail.status !== 'RUNNING') {
                // Automatically create teacher's work schedule and 16 default classes based on the start date and weekly schedule
                // Prevent teachers from registering for this class
            } else if (status === 'DROP') {
                // Prevent teachers from registering for this class
            }
    
            const updatedClass = await classDetail.save();
            res.status(200).json({
                message: 'Class updated successfully',
                updatedClass
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),
    

}

export default classController;