import express from "express";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";
import classSessionController from "../../controllers/Classes/classSessionController.js";
const router = express.Router();

router
    .post("/register", authMiddleware, isTE, classSessionController.register)
    .get("/:classId", authMiddleware, classSessionController.getOne)
    .get("/getAll", authMiddleware, classSessionController.getAll)
    .delete("/:classId/delete", authMiddleware, isTE, classSessionController.delete)
    .put("/:classId/checkAttendance", authMiddleware, classSessionController.checkAttendance)
    
export default router;