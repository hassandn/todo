// routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;  

    if (!email || !password) {
      return res.status(400).json({ message: "all fields must be filled." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email is already exists." });
    }

    const newUser = new User({ email });
    newUser.setPassword(password); 
    await newUser.save();

    res.status(201).json({ message: "user created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error", error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: "email or password is incorect" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "very_very_sercret_key",
      { expiresIn: "1h" }
    );

    res.json({ message: "token generated", token });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});
    

module.exports = router;
