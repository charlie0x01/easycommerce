// server.js
// Import the Express module
import express, { Express } from "express";
import cors from "cors";
// routes
import userRouter from "./routes/user.routes";
import path from "path";
import env from "./utils/env";
// swagger ui
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger/swagger_output.json";

// Create an instance of an Express application
const app: Express = express();

// parse request body to json
app.use(express.json());

// handle cross origin requests
app.use(cors());

// set view engine to ejs
app.set("view engine", "ejs");

// change default views path (root-directory) to custom path (root-directory/src/views)
app.set("views", path.join(__dirname, "/views/"));
app.use(express.static("./public"));

// Define a port to listen on
const PORT = env.port;

// api routes
app.use(`${env.apiPrefix}/user`, userRouter);

// api docs
app.use(`${env.apiPrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerJson));

export { app, PORT };
