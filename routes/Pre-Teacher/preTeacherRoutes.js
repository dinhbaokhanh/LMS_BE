import express from "express";
import preTeacherController from "../../controllers/Teacher/preTeacherController.js";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
    .post("/register", authMiddleware, isTE, preTeacherController.register)
    .get("/getAll", authMiddleware, isTE, preTeacherController.getAll)
    .get("/:id", authMiddleware, isTE, preTeacherController.getOne)
    .delete("/delete/:id", authMiddleware, isTE, preTeacherController.delete)

router
    .put("/update/:id", authMiddleware, isTE, preTeacherController.update)

router
    .put("/accept/:id", authMiddleware, isTE, preTeacherController.accept)
    .put("/reject/:id", authMiddleware, isTE, preTeacherController.reject)

export default router;