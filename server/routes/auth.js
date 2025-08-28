const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password"); 
  res.json(user);
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name, age, gender, contact } = req.body;
    console.log(`👤 Completing signup for: ${email} with name: ${name}`);
    
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(400).json({ error: "OTP not verified or user not found" });
    
    user.name = name;
    user.age = age;
    user.gender = gender;
    user.contact = contact;
    await user.save();
    
    console.log(`✅ User profile updated: ${user.name}`);
    
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    console.log(`🔑 Token generated for new user`);
    
    res.json({ 
      success: true, 
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        contact: user.contact
      }
    });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(400).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



const sendOTPEmail = require("../utils/sendOTPEmail");
const bcrypt = require("bcryptjs");
router.post("/send-otp", async (req, res) => {
  try {
    const { email, password, signup } = req.body;
    console.log(`🎯 OTP Request - Email: ${email}, Signup: ${signup}`);
    
    let user = await User.findOne({ email });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 
    
    if (signup) {
      if (user) return res.status(400).json({ error: "User already exists" });
      console.log('📝 Creating new user for signup...');
      const hashed = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashed, otp, otpExpires });
      await user.save();
      console.log('✅ User created successfully');
    } else {
      if (!user) return res.status(400).json({ error: "User not found" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
      console.log('🔄 Updating existing user OTP...');
      
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
      console.log('✅ User OTP updated successfully');
    }
    
    console.log(`📤 Attempting to send OTP: ${otp} to ${email}`);
    const emailResult = await sendOTPEmail(email, otp);
    
    if (emailResult.success) {
      console.log('✅ Email sent successfully');
      res.json({ 
        message: "OTP sent to your email", 
        success: true,
        messageId: emailResult.messageId 
      });
    } else {
      console.error('❌ Email sending failed:', emailResult.error);
      res.status(500).json({ 
        error: "Failed to send email. Please check your email address and try again.",
        details: emailResult.error 
      });
    }
  } catch (err) {
    console.error('❌ Send OTP Error:', err);
    res.status(500).json({ error: err.message });
  }
});


router.post("/verify-otp", async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (!user.otp || user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });
    if (user.otpExpires < new Date())
      return res.status(400).json({ error: "OTP expired" });
    
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    if (!user.otp || user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });
    if (user.otpExpires < new Date())
      return res.status(400).json({ error: "OTP expired" });
    
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}


router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route!", user: req.user });
});

module.exports = router;
