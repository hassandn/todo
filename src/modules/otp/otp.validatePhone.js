const validator = require("validator");

const validatePhone = (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "phone number is required!" });
  }

  if (!validator.isMobilePhone(phone, "fa-IR")) {
    return res.status(400).json({ message: "phone number format is invalid!" });
  }

  next();
};

module.exports = validatePhone;