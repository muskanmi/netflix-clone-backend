const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { json } = require("express");
const userRoutes = require("./routes/UserRoutes");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err.message);
  });

app.use("/api/user", userRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
