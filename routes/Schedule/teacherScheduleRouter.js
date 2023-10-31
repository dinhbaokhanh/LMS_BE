import express from "express";
import teacherScheduleController from "../../controllers/Schedule/teacherScheduleController.js"
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.
    get('/:teacherId', authMiddleware, teacherScheduleController.generateTeacherSchedule)

export default router;