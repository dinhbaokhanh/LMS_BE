import asyncHandler from "express-async-handler";
import CourseLevel from "../../models/Courses/CourseLevel.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import _throw from "../../utils/_throw.js";

const courseLevelController = {
    register: asyncHandler(async (req, res) => {
        const { levelName, levelCode, courseId } = req.body;
        const findLevel = await CourseLevel.findOne({ levelCode: levelCode });
        const file = req.file;
        let syllabus;
        if(!courseId){
            return _throw({
                code: 400,
                message: "Course ID is required"
            })
        }
        if (!findLevel) {
            if (file) {
                {
                    const { originalname, buffer } = file;
                    const path = `Syllabus/${levelName}/${originalname}`;
                    const storageRef = ref(getStorage(), path);
                    const result = await uploadBytes(storageRef, buffer)
                    const url = await getDownloadURL(result.ref);
                    syllabus = [url];
                }
            }
            try {
                const courseLevel = await CourseLevel.create({ levelName, levelCode, syllabus, courseId });
                res.status(201).json(courseLevel);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        } else {
            _throw({
                code: 400,
                message: "Level Code has already existed"
            })
        }
    }),

    // Get all course levels
    getAll: asyncHandler(async (req, res) => {
        const courseLevels = await CourseLevel.find({});
        res.status(200).json(courseLevels);
    }),

    // Get a single course level by slug
    getOne: asyncHandler(async (req, res) => {
        const courseLevel = await CourseLevel.findOne({ slug: req.params.slug });
        if (!courseLevel) {
            res.status(404);
            throw new Error('Course level not found');
        }
        res.status(200).json(courseLevel);
    }),

    // Update a course level by slug
    update: asyncHandler(async (req, res, next) => {
        const { levelName, levelCode, syllabus, courseId } = req.body;
        const courseLevel = await CourseLevel.findOneAndUpdate(
            { slug: req.params.slug },
            { levelName, levelCode, syllabus, courseId },
            { new: true }
        );
        if (!courseLevel) {
            return next(new Error('Course level not found'));
        }
        res.status(200).json(courseLevel);
    }),

    // Delete a course level by slug
    delete: asyncHandler(async (req, res) => {
        const courseLevel = await CourseLevel.findOneAndDelete({ slug: req.params.slug });
        if (!courseLevel) {
            res.status(404);
            throw new Error('Course level not found');
        }
        res.status(200).json({
            message: "Course Level is deleted",
        });
    })
}

export default courseLevelController;