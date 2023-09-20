import express from "express";
import accountController from "../../controllers/User/accountController.js";
import { authMiddleware, isTE } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router
    .get("/allUsers",authMiddleware, isTE, accountController.getAllUser)
    .get("/user/:id", authMiddleware, accountController.getUser)

router
    .put("/update/info",authMiddleware, accountController.updateInfo)

router  
    .delete("/delete/:id", authMiddleware, isTE, accountController.deleteUser)

export default router;