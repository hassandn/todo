const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./src/routes/userRoutes");
const todoRoutes = require("./src/routes/todoRoutes");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/myapp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
