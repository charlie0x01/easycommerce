// server.js
// Import the Express module
import express, { Express, Request, Response} from 'express'

// Create an instance of an Express application
const app: Express = express();

// Define a port to listen on
const PORT = process.env.PORT || 8000;

// Define a single endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to EasyCommerce!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
