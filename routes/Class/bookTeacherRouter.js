import express from "express";
import bookTeacherController from "../../controllers/Teacher/bookTeacherController.js";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
    .post('/register', authMiddleware, bookTeacherController.registerForClass)
    .get('/registration/:classId/getAll', authMiddleware, isTE, bookTeacherController.getAllRegistration)
    .put('/:classId/accept/:teacherId', authMiddleware, isTE, bookTeacherController.acceptRegistration)
    .put('/:classId/reject/:teacherId', authMiddleware, isTE, bookTeacherController.rejectRegistration)

export default router;