import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/smtp-pool";
import env from "../utils/env";

const transporter = nodemailer.createTransport({
  host: env.mailHost,
  port: 465,
  secure: true,
  auth: {
    user: env.mailUsername,
    pass: env.mailPassword,
  },
});

export const sendMail = (
  from: string,
  to: string,
  subject: string,
  html: string,
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
