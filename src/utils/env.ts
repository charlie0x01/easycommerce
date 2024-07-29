import dotenv from "dotenv";
dotenv.config();

export default {
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || "",
  host: process.env.HOST || "",
  apiPrefix: process.env.API_PREFIX,
  mailHost: process.env.MAIL_HOST || "",
  mailUsername: process.env.MAIL_USERNAME || "",
  mailPassword: process.env.MAIL_PASSWORD || "",
  port: process.env.PORT || 8000,
};
