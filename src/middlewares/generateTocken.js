// 

const jwt = require("jsonwebtoken");
const Register = require("../models/User/Register.models"); // make sure path is correct

// ================= Generate JWT =================
const generatetoken = (userId) => {
  return jwt.sign(
    { id: userId }, // payload
    process.env.JWT_TOK || "mysecretkey", // secret
    { expiresIn: "1h" } // expiry
  );
};

// ================= Verify JWT Middleware =================
const verifyToken = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please login first" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_TOK || "mysecretkey");

    // Find user in DB
    const user = await Register.findById(payload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user id to request object
    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { generatetoken, verifyToken };
