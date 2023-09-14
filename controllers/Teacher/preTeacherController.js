import PreTeacher from "../../models/Users/preTeacher.js"
import Account from "../../models/Users/account.js";
import Teacher from "../../models/Teacher/teacher.js";
import asyncHandler from "express-async-handler";
import _throw from "../../utils/_throw.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
}

const preTeacherController = {
    register: asyncHandler(async (req, res) => {
        try {
            const preTeacher = new PreTeacher(req.body);
            await preTeacher.save();
            const email = preTeacher.email;
            const password = 'Lms@12345';
            const findUser = await Account.findOne({ email: email });
            if (!findUser) {
                const { salt, hash } = await hashPassword(password);
                const account = await Account.create({
                    email,
                    password: hash,
                    salt,
                    userType: 'pre-teacher',
                    id: preTeacher.id
                });

                res.status(200).json({
                    status: true,
                    message: "Pre-Teacher and account created",
                    preTeacher,
                    account
                });
            } else {
                _throw({
                    code: 400,
                    message: 'Email has already existed',
                })
            }
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    getAll: asyncHandler(async (req, res) => {
        try {
            const preTeacher = await PreTeacher.find();
            res.status(200).json({
                status: true,
                message: "Get all pre-teacher successfully",
                preTeacher
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    getOne: asyncHandler(async (req, res) => {
        const { id } = req.params;
        try {
            const preTeacher = await PreTeacher.findById(id);;
            if (!preTeacher) {
                _throw(404, 'Pre-teacher not found');
            }
            res.status(200).json({
                status: true,
                message: "Get pre-teacher successfully",
                preTeacher
            });
        } catch (error) {
            _throw({ message: error.message });
        }
    }),

    update: asyncHandler(async (req, res) => {
        try {
            const preTeacher = await PreTeacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!preTeacher) {
                _throw(404, 'Pre-teacher not found');
            }
            res.status(200).json({
                status: true,
                message: "pre-teacher updated",
                preTeacher
            });
        } catch (error) {
            _throw({ message: error.message });
        }
    }),

    accept: asyncHandler(async (req, res) => {
        const { id } = req.params;
        console.log(id);
        try {
            const preTeacher = await PreTeacher.findById(id);
            if (!preTeacher) {
                return res.status(404).json({
                    status: false,
                    message: "PreTeacher not found"
                });
            }
            preTeacher.status = "ACCEPTED";
            await preTeacher.save();
            const account = await Account.findById(preTeacher._id);
            if (account) {
                account.activate = true;
                await account.save();
                const teacher = new Teacher({
                    idAccount: account._id,
                    email: preTeacher.email,
                    fullName: preTeacher.fullName,
                    phoneNumber: preTeacher.phoneNumber,
                    gender: preTeacher.gender,
                    dob: preTeacher.dob,
                    role: preTeacher.role,
                    facebookLink: preTeacher.facebookLink
                });
                await teacher.save();
            } else {
                return res.status(404).json({
                    status: false,
                    message: "Account not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "PreTeacher accepted and Account activated",
                preTeacher,
                account
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    reject: asyncHandler(async (req, res) => {
        try {
            const preTeacher = await PreTeacher.findById(req.params.id);
            if (!preTeacher) {
                return res.status(404).json({
                    status: false,
                    message: "PreTeacher not found"
                });
            }
            preTeacher.status = "REJECTED";
            await preTeacher.save();
            const account = await Account.findById(preTeacher.idAccount);
            if (account) {
                account.activate = false;
                await account.save();
            }
            res.status(200).json({
                status: true,
                message: "PreTeacher rejected and Account deactivated",
                preTeacher,
                account
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            })
        }
    }),

    delete: asyncHandler(async (req, res) => {
        try {
            const preTeacher = await PreTeacher.findByIdAndDelete(req.params.id);
            if (!preTeacher) {
                _throw(404, 'Pre-teacher not found');
            }
            res.status(200).json({
                status: true,
                message: "pre-teacher deleted",
                preTeacher
            });
        } catch (error) {
            _throw({ message: error.message });
        }
    })
}

export default preTeacherController