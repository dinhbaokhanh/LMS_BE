import Class from "../../models/Class/Class.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const classController = {
    register: asyncHandler(async (req, res) => {
        const { codeClass, courseId, courseLevelId, classSchedule } = req.body;
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
                classSchedule,
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

    // getAllByTeacher: asyncHandler(async(req, res) => {
    //     const { teacher } = req.params;
    //     if(!teacher) return _throw({
    //         code: 400,
    //         message: "Teacher not found"
    //     })
    //     try {
    //         const classes = await Class.find({bookTeacherId: teacher})
    //         if(!classes){
    //             _throw({
    //                 code: 404,
    //                 message: "Teacher has no class"
    //             })
    //         }
    //         res.status(200).json({
    //             message: "Get class successfully",
    //             classes
    //         })
    //     } catch (error) {
            
    //     }
    // }),

    getOne: asyncHandler(async (req, res) => {
        try {
            const classDetail = await Class.findById(req.params.id);
            if (!classDetail) {
                return res.status(404).json({
                    message: 'Class not found',
                });
            }
            res.status(200).json(classDetail);
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
    
    delete: asyncHandler(async(req, res) => {
        const { id } = req.params;
        const findClass = await Class.findByIdAndDelete(id);
        res.status(200).json({
            message: "Deleted successfully",
            findClass
        })
    })
}

export default classController;