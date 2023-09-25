const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Dean = require("../models/dean");
require("dotenv").config();

function generateToken(userId, role) {
  const payload = { userId, role };
  const options = { expiresIn: "1h" };
  console.log(process.env.JWT_SECRET)
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

async function studentLogin(req, res) {
  const { universityID, password } = req.body;
  try {
    const student = await Student.findOne({ universityID, password });
    if (!student) {
      throw new Error("Invalid student credentials");
    }

    const token = generateToken(student._id, "student");
    return res.status(200).json({ token });
  } catch (err) {
     return res.status(500).json({ message: `Internal server error - ${err}` });
  }
}

async function deanLogin(req, res) {
  const {universityId, password} = req.body;
  try{
    const dean = await Dean.findOne({ universityId, password });
    if (!dean) {
      throw new Error("Invalid dean credentials");
    }

    const token = generateToken(dean._id, "dean");
    return res.status(200).json({ token });
  }catch(err){
    return res.status(500).json({ message: `Internal server error - ${err}` });
  }

}

module.exports = { studentLogin, deanLogin };