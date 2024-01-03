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
    user &&
      res
        .status(200)
        .json({ status: true, message: "user fetch by id", data: user });
    !user &&
      res.status(200).json({ status: false, message: "User not found by id" });
  } catch (error) {
    res.status(500).json(error);
  }
});
//follow

router.put("/follow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const currentUser = User.findOne({ _id: req.body.userId });
    let isFollowed = false;
    user.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });
    if (isFollowed) {
      res
        .status(200)
        .json({ status: false, message: "Already you followed this user" });
    } else {
      const res1 = await User.updateOne(
        {
          _id: req.params.id,
        },
        { $push: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        {
          _id: req.body.userId,
        },
        { $push: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "followed user successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// //Unfollow

router.put("/unfollow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: req.body.userId });
    let isFollowed = false;
    user.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });
    if (!isFollowed) {
      res
        .status(200)
        .json({ status: false, message: "You are not following this user" });
    } else {
      const res1 = await User.updateOne(
        {
          _id: req.params.id,
        },
        { $pull: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        {
          _id: req.body.userId,
        },
        { $pull: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "unfollowed user successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.put("/follow/:id", async (req, res) => {
//  try {
//   const user = await User.findOne({ _id: req.params.id });
//   let follower = false;
//   user.followers.map((item) => {
//     if (item == req.body.userId) {
//       follower = true;
//     }
//   });
//   if (follower) {
//     const res1 = await User.updateOne(
//       {
//         _id: req.params.id,
//       },
//       { $pull: { following:req.body.userId} }
//     );
//     res
//       .status(200)
//       .json({ status: true, message: "followed user successfully" });
//   } else {
//     const res2 = await User.updateOne(
//       {
//         _id: req.params.id,
//       },
//       { $push: { followers:req.body.userId} }
//     );
//     res
//       .status(200)
//       .json({ status: true, message: "unfollowed user successfully" });
//   }
//  } catch (error) {
//   res
//   .status(500)
//   .json(error);

//  }
// });

module.exports = router;
