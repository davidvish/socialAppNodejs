const User = require("../models/User");

const router = require("express").Router();
const bcrypt = require("bcrypt");
// Regitster
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      gender: req.body.gender,
      dob: req.body.dob,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(200).json({ status: false, message: "user not found" });
    const vaildPassword = await bcrypt.compare(req.body.password,user.password)

    if (vaildPassword) {
      res.status(200).json({
        status: true,
        message: "user found successfully",
        data: user,
      });
    } else {
      res.status(200).json({
        status: true,
        message: "wrong password",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
