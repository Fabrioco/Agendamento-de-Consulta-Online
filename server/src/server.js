const express = require("express");
const database = require("./config/database");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

database.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
});
