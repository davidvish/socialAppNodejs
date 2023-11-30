const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// update users
router.put("/update/:id", async (req, res) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(() => {
        res
          .status(200)
          .json({ status: true, message: "Your data update succsufully" });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete users
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      User.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res
          .status(200)
          .json({ status: true, message: "User Deleted successfully" });
      });
    } else {
      res
        .status(200)
        .json({ status: false, message: "User not found with id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get users

router.get("/get", async (req, res) => {
  User.find().then((user) => {
    res
      .status(200)
      .json({
        status: true,
        message: "User list found successfully",
        data: user,
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  });
});

//get user by id

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    user && res.status(200).json({ status: true, message: "user fetch by id",data:user });
    !user && res.status(200).json({status:false,message:'User not found by id'})
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
