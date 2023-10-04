import express from "express"
import classController from "../../controllers/Classes/classController.js";
import { authMiddleware,isTE } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router
    .post("/register", authMiddleware, isTE, classController.register)
    .get("/getAll", authMiddleware, isTE, classController.getAll)
    // .get("/:teacher", authMiddleware, classController.getAllByTeacher)
    .get("/:id", authMiddleware, classController.getOne)
    .put("/update/:id", authMiddleware, isTE, classController.update)
    .delete("/delete/:id", authMiddleware, isTE, classController.delete)

export default router;