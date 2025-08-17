const otpService = require("./otp.service");
const redisClient = require("../../config/redis");
const authService = require("../auth/auth.service");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = await otpService.generateOtp(phone);
    
    await redisClient.set(phone, otp, { EX: 120 })
    res.json({ message: "OTP sent successfully!" });
  } catch (err) {
    res.status(500).json({ message: "you tried too much come back later" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp, email, password } = req.body;

    const isOtpValid = await otpService.verifyOtp(phone, otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const user = await User.findOne({ email });
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "very_very_sercret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("🚨 Error verifying OTP or logging in:", err);
    res.status(500).json({ message: "Error verifying OTP or logging in" });
  }
};