const app = require("./app");
const dotenv = require("dotenv");
const ConnectDatabase = require("./config/database");

//Handling Uncaught Exceptional
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down server due to Uncaught Exceptional`);
  process.exit(1);
});

//dotevn npm install and importing so we can read variables from .env file.
dotenv.config({ path: "backend/config/config.env" });

// calling database connection imported from config/database
ConnectDatabase();

// creating server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is working at http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down server due to Unhandled Promise Rejection`);

  server.close(() => process.exit(1));
});
