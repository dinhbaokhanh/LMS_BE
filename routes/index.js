import authRouter from "./Account/authRouter.js"
import accountRouter from "./Account/accountRoutes.js"
import courseLevelRouter from "./Course/courseLevelRoutes.js";
import preTeacherRouter from "./Pre-Teacher/preTeacherRoutes.js";
import teacherRouter from "./Teacher/teacherRouter.js";
import courseRouter from "./Course/courseRouter.js";
import locationRouter from "./Location/locationRouter.js"

const routerPath = [
    {path: '/account', route: accountRouter},
    {path: '/auth', route: authRouter},
    {path:'/courseLevel', route: courseLevelRouter},
    {path: '/course', route: courseRouter},
    {path: '/preTeacher', route: preTeacherRouter},
    {path: '/teacher', route: teacherRouter},
    {path: '/location', route: locationRouter}
]

export default routerPath;