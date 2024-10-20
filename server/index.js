import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/Users.model.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_STR);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// app.use("/", (req, res) => {
//   res.send("Hello There!");
// });

app.get("/", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, data: "Server Error" });
  }
});

app.post("/", async (req, res) => {
  const userData = req.body;

  if (!userData.name || !userData.age || !userData.username) {
    res
      .status(404)
      .json({ success: false, message: "Provide all fields and try again" });
  }

  const newUser = User(userData);

  try {
    await newUser.save();
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, data: "Server Error" });
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server Running at http://localhost:${PORT}`);
  connectDB();
});
