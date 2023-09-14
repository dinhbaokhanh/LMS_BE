import mongoose, {Schema} from "mongoose";
import validator from "validator";

const preTeacherSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['ACCEPTED', 'REJECTED', 'PENDING'],
        default: "PENDING"
    },
    email: {
        type: String,
        required: "Email required",
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid Email"
        }
    },
    fullName: {
        type: String,
        trim: true,
        required: "Name required",
        maxlength: 100,
    },
    phoneNumber: {
        type: String,
    },
    gender: {
        type: String,
        required: 'Gender required',
        enum: ['Male', 'Female'],
        default: 'Male',
    },
    dob: {
        required: true,
        type: Date,
    },
    progress: {
        type: String,
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
    currenttAddress: {
        type: String,
    },
    taxCode: String,
    facebookLink: {
        type: String,
    },
    area: String,
    educationInfo: Object,
    companyInfo: Object,
    background: Object,
    dateStartWork: Date,
    address: String,
    CVfile: Object,
    bankName: String,
    bankNumber: String,
    bankHolderName: String,
    role: {
        type: [String],
        enum: ['ST', 'SP', 'MT']
    },
    coursesRegister: [{
        idCourse: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        levelHandle: [String]
    }],
    timestamp: { type: Date, default: Date.now }
})

const PreTeacher = mongoose.model("preTeachers", preTeacherSchema);
export default PreTeacher;