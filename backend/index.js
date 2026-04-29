const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();




app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ msg: "Protected route working", user: req.user });
});

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});