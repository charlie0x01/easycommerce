// server.js
// Import the Express module
import express, { Express, Request, Response } from "express";
import cors from "cors";
import UserModel from "./models/user.model";
import { database } from ".";

// Create an instance of an Express application
const app: Express = express();
app.use(express.json()); // parse request body to json
app.use(cors()); // handle cross origin requests

// Define a port to listen on
const PORT = process.env.PORT || 8000;

// Define a single endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to EasyCommerce!", success: true });
});

app.post("/", async (req: Request, res: Response): Promise<Response> => {
  try {
    // create table, discard the existing one if exists
    await UserModel(database).sync();
    // create user
    const user = await UserModel(database).create({
      first_name: req?.body?.firstName,
      last_name: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });

    return res.status(200).json({
      message: "User Registered Successfully",
      success: true,
      data: user.toJSON(),
    });
  } catch (error) {
    return res.send({ success: false, message: error, data: null });
  }
});

export { app, PORT };
