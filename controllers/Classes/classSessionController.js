import ClassSession from "../../models/Class/ClassSession.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const classSessionController = {
    register: asyncHandler(async(req, res) => {
        try {
            const existed = await ClassSession.findOne({ sessionNumber: req.body.sessionNumber, date: req.body.date, classId: req.body.classId,
                teacherInSession: [] 
            });
            if(existed) return _throw({
                code: 400,
                message: "Session has already existed"
            })
            const classSession = new ClassSession(req.body)
            await classSession.save();
            res.status(200).json({
                status: true,
                message: "Sessions created",
                classSession,
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    })
}

 export default classSessionController;