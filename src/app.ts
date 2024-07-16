// server.js
// Import the Express module
import express, { Express, Request, Response } from "express";
import cors from "cors";
// routes
import userRouter from "./routes/user.routes";

// Create an instance of an Express application
const app: Express = express();
app.use(express.json()); // parse request body to json
app.use(cors()); // handle cross origin requests

// Define a port to listen on
const PORT = process.env.PORT || 8000;

// api routes
app.use("/api/user", userRouter);

// Define a single endpoint
app.get("/info", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to EasyCommerce!", success: true });
});

export { app, PORT };
