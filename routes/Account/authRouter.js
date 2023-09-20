import express from "express";
import accountController from "../../controllers/User/accountController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router
    .post("/register", accountController.register)
    .post("/login", accountController.login)
    .post("/refresh", accountController.refreshToken)
    .post("/forgot-password", accountController.forgotPasswordToken)
    .put("/update/password", authMiddleware, accountController.updatePassword)
    .put("/reset-password/:token", accountController.resetPassword)
    .post("/logout", accountController.logOut)


export default router;