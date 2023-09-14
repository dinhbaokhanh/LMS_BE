import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const courseLevelSchema = new mongoose.Schema({
    id: String,
    levelName: {
        type: String,
        required: true
    },
    levelCode: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    syllabus: {
        type: Array,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
})

courseLevelSchema.pre("save", function(next) {
    this.slug = slugify(this.levelCode, {lower: true});
    next()
})

const CourseLevel = mongoose.model('CourseLevel', courseLevelSchema);
export default CourseLevel;