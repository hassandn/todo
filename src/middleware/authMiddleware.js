const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token not found!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "very_very_sercret_key");
    req.user = await User.findById(decoded.id).select("-passwordHash");
    next();
  } catch (err) {
    return res.status(401).json({ message: "token is invalid or expired." });
  }
};

module.exports = authMiddleware;