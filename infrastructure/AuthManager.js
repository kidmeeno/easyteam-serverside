const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

class AuthManager {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload) {
    const privateKeyPath = path.join(__dirname, "../priv.key");
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    return jwt.sign(payload, privateKey, { algorithm: "RS256" });
  }

  static verifyToken(token) {
    const privateKeyPath = path.join(__dirname, "../priv.key");
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    return jwt.verify(token, privateKey, { algorithm: "RS256" });
  }
}

module.exports = AuthManager;
