const express = require("express");
const router = express.Router();
const otpController = require("./otp.controller");
const checkOtpLimit = require("./otp.validatePhone");

router.post("/send-otp", checkOtpLimit, otpController.sendOtp);

router.post("/verify-otp", otpController.verifyOtp);

module.exports = router;
