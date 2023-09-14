import express from "express";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";
import courseController from "../../controllers/Courses/CourseController.js";

const router = express.Router();

router
    .post("/register", authMiddleware, isTE, courseController.register)
    .get("/getAll", authMiddleware, isTE, courseController.getAll)
    .get("/getActivated", authMiddleware, isTE, courseController.getAllActivate)
    .get("/:id", authMiddleware, isTE, courseController.getOne)
    .put("/update/:id", authMiddleware, isTE, courseController.update)
    .delete("/delete/:id", authMiddleware, isTE, courseController.delete)

router
    .put("/activate/:id", authMiddleware, isTE, courseController.activate)
    .put("/deactivate/:id", authMiddleware, isTE, courseController.deactivate)

export default router;