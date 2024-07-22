// server.js
// Import the Express module
import express, { Express, Request, Response } from "express";
import cors from "cors";
import ejs from "ejs";
// routes
import userRouter from "./routes/user.routes";
import path from "path";
import isUserVerifiedMiddleware from "./middlewares/isUserVerified.middleware";

// Create an instance of an Express application
const app: Express = express();
app.use(express.json()); // parse request body to json
app.use(cors()); // handle cross origin requests
app.set("view engine", "ejs"); // set view engine to ejs
// change default views path (root-directory) to custom path (root-directory/src/views)
app.set("views", path.join(__dirname, "/views/"));
app.use(express.static('./public'))

// Define a port to listen on
const PORT = process.env.PORT || 8000;

// api routes
app.use("/api/user", userRouter);

app.get(
  "/api/verify-email",
  isUserVerifiedMiddleware,
  (req: Request, res: Response) => {
    try {
      return res.render("clickToVerify", { username: ''});
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong, please try again later",
      });
    }
  }
);

export { app, PORT };
