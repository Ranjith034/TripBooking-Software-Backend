const jwt = require("jsonwebtoken");
const Register = require("../../models/User/Register.models"); // adjust path if needed

// Generate JWT token
const generatetoken = (userId) => {
  return jwt.sign(
    { id: userId }, // payload
    process.env.JWT_TOK || "mysecretkey", // secret (fallback if env missing)
    { expiresIn: "1h" } // expiry time
  );
};

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // Check header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Please login first" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_TOK || "mysecretkey");

    // Find user in DB
    const checkUser = await Register.findById(payload.id);
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user info to request
    req.userId = checkUser._id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error });
  }
};

module.exports = { generatetoken, verifyToken };
