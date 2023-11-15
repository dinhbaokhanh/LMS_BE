import Feedback from "../../models/Feedback/Feedback.js";
import asyncHandler from "express-async-handler";
import _throw from "../../utils/_throw.js";

const FeedbackController = {
    register: asyncHandler(async (req, res) => {
        try {
            const { name, phoneNumber, course, classCode, group, mentor,
                specializationPoint, attitudePoint, comment } = req.body;
            const existingFeedbacks = await Feedback.find({ classCode: classCode, name: name });
            const phase = existingFeedbacks.length % 2 + 1;
            const feedback = new Feedback({
                phase,
                name,
                phoneNumber,
                course,
                classCode,
                group,
                mentor,
                specializationPoint,
                attitudePoint,
                comment
            });
            await feedback.save();
            res.status(201).json({
                message: "Feedback was filled",
                feedback
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    getFeedback: asyncHandler(async (req, res) => {
        const { classCode } = req.params;
        const feedbacks = await Feedback.find({ classCode: classCode }).sort({ phase: -1 });
        console.log(feedbacks);
        if (!feedbacks) {
            return _throw({
                code: 404,
                message: "This class does not have feedback"
            })
        }
        try {
            res.status(200).json({
                message: "Take feedbacks successfully",
                feedbacks
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),
}

export default FeedbackController;