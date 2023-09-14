import express from "express";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";
import locationController from "../../controllers/Location/locationController.js";
const router = express.Router();

router
    .post("/register", authMiddleware, isTE, locationController.register)
    .get("/getAll", authMiddleware, isTE, locationController.getAll)
    .get("/:id" ,authMiddleware, isTE, locationController.getOne)
    .put("/update/:id", authMiddleware, isTE, locationController.update)
    .delete("/delete/:id", authMiddleware, isTE, locationController.delete)

export default router;