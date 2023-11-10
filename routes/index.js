import authRouter from "./Account/authRouter.js"
import accountRouter from "./Account/accountRoutes.js"
import courseLevelRouter from "./Course/courseLevelRoutes.js";
import preTeacherRouter from "./Pre-Teacher/preTeacherRoutes.js";
import teacherRouter from "./Teacher/teacherRouter.js";
import courseRouter from "./Course/courseRouter.js";
import locationRouter from "./Location/locationRouter.js";
import classScheduleRouter from "./Schedule/classScheduleRoutes.js";
import classRouter from "./Class/ClassRouter.js";
import classSessionRouter from "./Class/ClassSessionRouter.js";
import bookTeacherRouter from "./Class/bookTeacherRouter.js";
import teacherScheduleRouter from "./Schedule/teacherScheduleRouter.js";
import feedbackRouter from "./Feedback/feedbackRouter.js"

const routerPath = [
    {path: '/account', route: accountRouter},
    {path: '/auth', route: authRouter},
    {path:'/courseLevel', route: courseLevelRouter},
    {path: '/course', route: courseRouter},
    {path: '/preTeacher', route: preTeacherRouter},
    {path: '/teacher', route: teacherRouter},
    {path: '/location', route: locationRouter},
    {path: '/class/schedule', route: classScheduleRouter},
    {path: '/class', route: classRouter},
    {path: '/class/sessions', route: classSessionRouter},
    {path: '/class/teacher', route: bookTeacherRouter},
    {path: '/teacher/schedule', route: teacherScheduleRouter},
    {path: '/feedback', route: feedbackRouter}
]

export default routerPath;