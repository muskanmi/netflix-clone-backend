const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { json } = require("express");
const userRoutes = require("./routes/UserRoutes");

const app = express();

app.use(cors());
app.use(json());

mongoose
  .connect("mongodb://127.0.0.1:27017/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

app.listen(5000, console.log("server started"));