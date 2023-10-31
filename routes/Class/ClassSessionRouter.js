import express from "express";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";
import classSessionController from "../../controllers/Classes/classSessionController.js";
const router = express.Router();

router
    .post("/register", authMiddleware, isTE, classSessionController.register)
    .get("/:classId/classSession", authMiddleware, classSessionController.getOne)
    .get("/getAll", authMiddleware, classSessionController.getAll)
    
export default router;