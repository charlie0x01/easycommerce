import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/smtp-pool";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  const mailOptions: MailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) throw error;
    if (info) console.log(info?.response);
  });
};
