import cron from "node-cron"
import PreTeacher from "../models/Users/preTeacher.js";// adjust this path to your PreTeacher model

const deletePreTeachers = () => {
    cron.schedule('* * * * * *', async () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const preTeachers = await PreTeacher.find({
            status: { $in: ['ACCEPTED', 'REJECTED'] },
            updatedAt: { $lt: oneWeekAgo }
        });

        for (const preTeacher of preTeachers) {
            await PreTeacher.findByIdAndDelete(preTeacher._id);
        }
    });
};

export default deletePreTeachers;
