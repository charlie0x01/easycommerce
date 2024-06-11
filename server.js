// server.js
// Import the Express module
const express = require("express");

// Create an instance of an Express application
const app = express();

// Define a port to listen on
const PORT = process.env.PORT || 4000;

// Define a single endpoint
app.get("/", (req, res) => {
  res.send("Welcome to EasyCommerce!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
