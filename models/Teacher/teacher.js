import mongoose from "mongoose";
import validator from "validator";

const teacherSchema = new mongoose.Schema({
    idAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    isOffical: {
        type: Boolean,
        required: true,
        default: false,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid Email"
        }
    },
    fullName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    phoneNumber: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
        default: 'Male'
    },
    dob: {
        type: Date,
        max: new Date(),
        default: new Date(1)
    },
    identify: {
        type: String,
        required: true,
    },
    licenseDate: {
        type: String,
        required: true,
    },
    licensePlace: {
        type: String,
        required: true,
    },
    permanentAddress: String,
    taxCode: String,
    facebookLink: {
        type: String,
    },
    area: {
        type: String,
        enum: ['HN', 'HCM', 'ONL', 'DN']
    },
    educationInfo: Object,
    companyInfo: Object,
    background: Object,
    address: String,
    CVfile: Object,
    bankName: String,
    bankNumber: String,
    bankHolderName: String,
    role: {
        type: [String],
        enum: ['Teacher', 'Mentor', 'MC']
    },
    courses: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        levelHandle: [String]
    }],
    salary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salary'
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    classRegister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassRegister'
    },
    timestamp: { type: Date, default: Date.now },
    createdAt: Date,
})

const Teacher = mongoose.model('Teachers', teacherSchema);

export default Teacher;