import express from "express";
import classScheduleController from "../../controllers/Schedule/classScheduleController.js";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
    .post("/register", authMiddleware, isTE, classScheduleController.register)
    .get("/:id", authMiddleware, isTE, classScheduleController.getOne)
    .get("/getAll", authMiddleware, isTE, classScheduleController.getAll)
    .put("/update/:id", authMiddleware, isTE, classScheduleController.update)

router
    .put("/activate/:id", authMiddleware, isTE, classScheduleController.activate)
    .put("/deactivate/:id", authMiddleware, isTE, classScheduleController.deactivate)
    
export default router;