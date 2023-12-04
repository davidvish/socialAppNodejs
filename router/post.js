const Post = require("../models/Post");
const User = require("../models/User");

const router = require("express").Router();

//add post

router.post("/add", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    newPost
      .save()
      .then(() => {
        res
          .status(200)
          .json({ status: true, message: "Post data added successfully" });
      })
      .catch(() => {
        res.status({ status: false, message: "Post not added" });
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

// update post

router.put("/update/:id", async (req, res) => {
  try {
    const post = Post.findOne({ _id: req.params.id });
    Post.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Post Update successfully",
          data: post,
        });
      })
      .catch(() => {
        res.status(200).json({ status: false, message: "Post not found" });
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete post

router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (post) {
      Post.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res
          .status(200)
          .json({ status: true, message: "Post delete by id", data: post });
      });
    } else {
      res.status(200).json({ status: true, message: "Post delete by id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all post

router.get("/get", async (req, res) => {
  const post = await Post.find();
  try {
    if (post) {
      res
        .status(200)
        .json({ status: true, message: "Get all post", data: post });
    } else {
      res.status(200).json({ status: true, message: "Not found any post" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get post detail by id
router.get("/get/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (post) {
      Post.findById({ _id: req.params.id }).then(() => {
        res
          .status(200)
          .json({ status: true, message: "Get Post by id", data: post });
      });
    } else {
      res
        .status(200)
        .json({ status: true, message: "Not found any post by this id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get post any of user

router.get("/getPost/:id", async (req, res) => {
  try {
    Post.find({ userId: req.params.id }).then((post) => {
      res
        .status(200)
        .json({ status: true, message: "Post find by user id", data: post });
    });
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

//Unfollow

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

module.exports = router;
