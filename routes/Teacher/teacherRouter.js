import express from "express";
import TeacherController from "../../controllers/Teacher/teacherController.js";
import { authMiddleware, isTE, isTeacher } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router
    .get("/getAll", authMiddleware, isTE, TeacherController.getAll)
    .get("/info/:id", authMiddleware, isTE, TeacherController.getOne)
    .put("/update/:id", authMiddleware, isTeacher, TeacherController.update)
    .delete("/delete/:id", authMiddleware, isTE, TeacherController.delete)

export default router;