const app = require("./app");
const dotenv = require("dotenv");
const ConnectDatabase = require("./config/database");

//dotevn npm install and importing so we can read variables from .env file.
dotenv.config({ path: "backend/config/config.env" });

// calling database connection imported from config/database
ConnectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`server is working at http://localhost:${process.env.PORT}`);
});
