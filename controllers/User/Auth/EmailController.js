import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler"

const emailController = {
    sendEmail: asyncHandler(async(data, req, res) => {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS,
            }          
        });
        let info = await transporter.sendMail({
            from: "Developer",
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html,
        });
        console.log("Message Send: ", info.messageId);
        console.log("Preview Url: ", nodemailer.getTestMessageUrl(info));
    })
}

export default emailController;