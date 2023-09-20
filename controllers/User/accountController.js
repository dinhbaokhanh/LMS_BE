import Account from "../../models/Users/account.js";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import _throw from "../../utils/_throw.js";
import { generateToken } from "../../config/jwToken.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateId from "../../config/validateId.js";
import emailController from "./Auth/EmailController.js";
import e from "express";

const saltRounds = 10;
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
}

const accountController = {
    register: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const findUser = await Account.findOne({ email: email });
        if (!findUser) {
            const { salt, hash } = await hashPassword(password);
            const createUser = await Account.create({
                ...req.body,
                password: hash,
                salt,
            });
            res.status(200).json({
                status: true,
                message: "User created",
                createUser
            });
        } else {
            _throw({
                code: 400,
                message: 'Email has already existed',
            })
        }
    }),

    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const findUser = await Account.findOne({ email: email });
        if (findUser && (findUser.isPasswordMatched(password))) {
            const accessToken = generateToken(findUser._id);
            const refreshToken = jwt.sign({ _id: findUser._id },
                process.env.REFRESH_TOKEN,
                { expiresIn: '1m' });
            res.status(200).json({
                status: true,
                message: "Log In Successfully",
                accessToken,
                refreshToken,
                role: findUser?.role,
            })
        } else {
            _throw({
                code: 500,
                message: "Invalid Credentials"
            })
        }
    }),

    logOut: asyncHandler(async (req, res) => {
        const { email } = req.body;
        const user = await Account.findOne({ email: email });

        if (!user) {
            _throw({ code: 404, message: "User not found" });
        } else {
            await Account.findOneAndUpdate(
                { email: email },
                { token: '' }
            );
            res.status(200).json({ message: "Log Out Successfully" });
        }
    }),

    refreshToken: asyncHandler(async (req, res) => {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader) {
            throw { code: 401, message: 'Authorization header not found' };
        }

        if (authHeader.startsWith('Bearer ')) {
            const refreshToken = authHeader.split('')[1];
            let payload;
            try {
                payload = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
            } catch (err) {
                throw { code: 403, message: "Invalid refresh token" };
            }

            const user = await Account.findOne({ _id: payload.userId });
            if (!user) {
                throw { code: 400, message: "User not found" };
            }

            if (user.refreshToken !== refreshToken) {
                throw { code: 403, message: "Invalid refresh token" };
            }

            const newAccessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
            user.accessToken = newAccessToken;
            await user.save();

            res.status(200).json({
                accessToken: newAccessToken,
                message: "Access token refreshed successfully"
            });
        } else {
            throw { code: 403, message: "Invalid token" };
        }
    }),

    getUser: asyncHandler(async (req, res) => {
        const { id } = req.params;
        try {
            const getProfile = await Account.findById(id);
            res.status(200).json({
                status: true,
                message: "User found", getProfile
            })
        } catch (error) {
            _throw({
                message: error.message
            })
        }
    }),

    getAllUser: asyncHandler(async (req, res) => {
        try {
            const AllUsers = await Account.find();
            res.status(200).json({
                message: "All Users Fetched",
                AllUsers,
            });
        } catch (error) {
            _throw({
                code: 500,
                message: error.message
            })
        }
    }),

    updateInfo: asyncHandler(async (req, res) => {
        const { _id } = req.user;
        validateId(_id);
        try {
            const user = await Account.findByIdAndUpdate(_id, req.body, { new: true });
            res.status(200).json({
                message: "Account Updated",
                user
            })
        } catch (error) {
            _throw({
                message: error.message
            })
        }
    }),

    deleteUser: asyncHandler(async (req, res) => {
        const { id } = req.params;
        try {
            await Account.findByIdAndDelete(id);
            res.status(200).json({
                status: true,
                message: "User is Deleted"
            })
        } catch (error) {
            _throw({
                message: error.message
            })
        }
    }),

    updatePassword: asyncHandler(async (req, res) => {
        const { _id } = req.user;
        const { password } = req.body;
        validateId(_id);
        try {
            const user = await Account.findById(_id);
            if (user && password && await (user.isPasswordMatched(password))) {
                _throw({
                    message: "You are using old password"
                })
            } else {
                user.password = password;
                await user.save();
                res.status(200).json({
                    status: true,
                    message: "Password updated"
                })
            }
        } catch (error) {
            _throw({
                message: error.message,
            })
        }
    }),

    forgotPasswordToken: asyncHandler(async (req, res) => {
        const { email } = req.body;
        const user = await Account.findOne({ email: email });
        if (!user) {
            _throw({
                message: "User is not existed"
            })
        }
        try {
            const token = await user.createPasswordResetToken();
            await user.save();
            const resetLink = `http://localhost:8000/account/reset-password/${token}`;
            const data = {
                to: email,
                text: `To ${user.fullName}`,
                subject: "Reset Password",
                html: resetLink,
            }
            emailController.sendEmail(data)
            res.status(200).json(resetLink);
        } catch (error) {
            _throw({
                message: error.message
            })
        }
    }),

    resetPassword: asyncHandler(async (req, res) => {
        const { password } = req.body;
        const { token } = req.params;
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await Account.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        })
        if (!user) {
            _throw({
                message: "Token expired"
            })
        }
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.status(200).json({
            status: true,
            message: "Password Reset"
        })
    }),


}

export default accountController;