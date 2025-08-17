const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./src/routes/userRoutes");
const todoRoutes = require("./src/routes/todoRoutes");
const otpRoutes = require("./src/modules/otp/otp.routes")
const connectDB = require("./src/config/db");

const app = express();
app.use(bodyParser.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/otp/", otpRoutes)

app.listen(3000, () => console.log("Server running on port 3000"));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
