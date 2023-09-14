import Account from "../models/Users/account.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import _throw from "../utils/_throw.js";

export const authMiddleware = asyncHandler(async(req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req?.headers?.authorization?.split(" ")[1];
        try {
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await Account.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            _throw({
                message: error.message,
            })
        }
    } else {
        _throw({
            message: "There is no token"
        })
    }
})

export const isTE = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const isTE = await Account.findOne({ email: email })
    if(isTE.role !== "TE"){
        _throw({
            message: "You are not a TE"
        }) 
    } else {
        next();
    }
})

export const isCXO = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const isCXO = await Account.findOne({ email: email })
    if(isCXO.role !== "CXO"){
        _throw({
            message: "You are not a CXO"
        }) 
    } else {
        next();
    }
})

export const isTeacher = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const isTeacher = await Account.findOne({ email: email })
    if(isTeacher.role !== "TEACHER"){
        _throw({
            message: "You are not a TEACHER"
        }) 
    } else {
        next();
    }
})