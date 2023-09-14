import express from "express";
import accountController from "../controllers/User/accountController.js";
import { authMiddleware, isTE } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
    .post("/register", accountController.register)
    .post("/login", accountController.login)
    .post("/forgot-password", accountController.forgotPasswordToken)

router
    .get("/allUsers",authMiddleware, isTE, accountController.getAllUser)
    .get("/user/:id", authMiddleware, accountController.getUser)

router
    .put("/update/info",authMiddleware, accountController.updateInfo)
    .put("/update/password", authMiddleware, accountController.updatePassword)
    .put("/reset-password/:token", accountController.resetPassword)

router  
    .delete("/delete/:id", authMiddleware, isTE, accountController.deleteUser)

export default router;