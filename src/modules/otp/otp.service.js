const redisClient = require("../../config/redis");

// افزودن تلاش ارسال OTP
exports.addAttempt = async (phone) => {
  const key = `otp_attempts:${phone}`;
  const exists = await redisClient.exists(key);

  if (!exists) {

    await redisClient.set(key, 1, { EX: 10 * 60 });
  } else {
    const count = await redisClient.incr(key);
    if (count > 3) {
      throw new Error;
    }
  }
};

exports.generateOtp = async (phone) => {
  await exports.addAttempt(phone); 

  const otp = Math.floor(100000 + Math.random() * 900000); 
  await redisClient.set(`otp:${phone}`, otp, { EX: 2 * 60 }); 

  console.log("OTP:", otp); 

  return otp;
};

exports.verifyOtp = async (phone, otp) => {
  const key = `otp:${phone}`;
  const storedOtp = await redisClient.get(key);

  if (!storedOtp) return false; 

  if (parseInt(otp) === parseInt(storedOtp)) {
    await redisClient.del(key); 
    return true;
  }

  return false;
};
