import express from "express";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";
import courseLevelController from "../../controllers/Courses/CourseLevelsController.js";

const router = express.Router();

router
    .post("/register", authMiddleware, isTE, courseLevelController.register)
    .get("/getAll", authMiddleware, isTE, courseLevelController.getAll)
    .get("/:slug", authMiddleware, isTE, courseLevelController.getOne)
    .put("/update/:slug", authMiddleware, isTE, courseLevelController.update)
    .delete("/delete/:slug", authMiddleware, isTE, courseLevelController.delete)

export default router;