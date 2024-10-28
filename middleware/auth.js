const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { JWT_SECRET } = require("../infrastructure/environmentalVariables");

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = verifyToken;
