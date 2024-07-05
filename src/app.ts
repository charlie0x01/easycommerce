// server.js
// Import the Express module
import express, { Express, Request, Response } from "express";
import cors from "cors";

// Create an instance of an Express application
const app: Express = express();
app.use(express.json()); // parse request body to json
app.use(cors());// handle cross origin requests

// Define a port to listen on
const PORT = process.env.PORT || 8000;

// Define a single endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to EasyCommerce!", success: true });
});

app.post("/", (req: Request, res: Response) => {
  console.log(req?.body);
  res.status(200).json({ message: "Welcome to EasyCommerce!", success: true });
});

export { app, PORT };
