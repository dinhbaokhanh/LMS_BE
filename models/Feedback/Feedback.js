import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    phase: {
        type: Number,
        enum: [1, 2]
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    courseLevel: {
        type: String,
        required: true,
    },
    classCode: {
        type: String,
        required: true,
    },
    group: {
        type: Number,
        required: true,
    },
    mentor: {
        type: String,
        required: true,
    },
    // Điểm chuyên môn
    specializationPoint: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    // Điểm thái độ
    attitudePoint: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    comment: {
        type: String,
        default: "Không có gì"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Feedback = mongoose.model('Feedbacks', FeedbackSchema);
export default Feedback;