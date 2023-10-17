import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto"
import bcrypt from "bcrypt";
import _throw from "../../utils/_throw.js";

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: v => {
            !validator.isEmail(v) &&
                _throw({
                    code: 400,
                    errors: [{
                        field: "email",
                        message: "Invalid Email"
                    }]
                })
        }
    },

    password: {
        type: String,
        minlegth: 8,
        validate: v => {
            !validator.isStrongPassword(v, {
                minLength: 8,
                minLowercase: 1,
                minNumbers: 1,
                minUppercase: 1,
                minSymbols: 1,
            }) &&
                _throw({
                    code: 400,
                    errors: [{
                        code: 400,
                        errors: [{
                            field: "password",
                            message: "Password is weak"
                        }]
                    }]
                })
        }
    },

    salt: String,

    role: {
        type: String,
        enum: ['TEACHER', 'TE', 'CXO']
    },

    accessToken: {
        type: String,
    },

    refreshToken: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    activate: Boolean,
})

accountSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

accountSchema.methods.isPasswordMatched = async function (inputPass) {
    return await bcrypt.compare(inputPass, this.password);
}

accountSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    return resetToken;
}

const Account = mongoose.model('Accounts', accountSchema);
export default Account;