import express from "express";
import FeedbackController from "../../controllers/Feedback/FeedbackController.js";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
    .post("/fillingForm", authMiddleware, isTE, FeedbackController.register)
    .get("/class/:classId", authMiddleware, isTE, FeedbackController.getFeedback)

export default router;