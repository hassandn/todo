const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign(
    { id: user._id, email: user.email },
    "very_very_sercret_key",
    { expiresIn: "1h" }
  );

  return { user, token };
};
