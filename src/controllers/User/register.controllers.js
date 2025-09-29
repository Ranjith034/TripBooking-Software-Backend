

const { generatetoken } = require("../../middlewares/generateTocken");
const Register = require("../../models/User/Register.models");

// ================= Register =================
const Registerdata = async (req, res) => {
  try {
    let { email } = req.body;

    // Check if email already exists
    const checkMail = await Register.findOne({ email });
    if (checkMail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user
    let finalreg = await Register.create({ ...req.body });

    res.status(201).json({
      finalreg,
      message: "Register Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error.message}`,
    });
  }
};

// ================= Login =================
const logindata = async (req, res) => {
  try {
    let { email, name } = req.body;

    // Find user by email
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Validate name with that same record
    if (user.name !== name) {
      return res.status(401).json({ message: "Invalid name" });
    }

    // Generate token with Mongo _id
    let token = generatetoken(user._id);

    res.status(200).json({
      user,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error.message}`,
    });
  }
};

module.exports = { Registerdata, logindata };
