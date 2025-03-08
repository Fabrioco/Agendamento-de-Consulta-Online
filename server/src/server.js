const express = require("express");
const database = require("./config/database");
const cors = require("cors");
const routerAuth = require("./routes/auth");
const { middlewareAuth } = require("./middleware/auth");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const routerSchedule = require("./routes/schedules");
const routerAppointment = require("./routes/appointment");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use("/api/auth", routerAuth);
app.use("/api/schedule", middlewareAuth, routerSchedule);
app.use("/api/appointment", middlewareAuth, routerAppointment);

database.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
});
