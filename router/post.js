const Post = require("../models/Post");
const User = require("../models/User");

const router = require("express").Router();
const upload = require("../middleware/upload");

//add post

router.post("/add", upload.single("imageUrl"), async (req, res) => {
  try {
    const newPost = new Post(req.body);
    if (req.file) {
      newPost.imageUrl = req.file.filename;
    }
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

router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    let isLiked = false;
    post.likes.map((item) => {
      if (item == req.body.userId) {
        isLiked = true;
      }
    });
    if (isLiked) {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.body.userId } }
      );
      res
        .status(200)
        .json({ status: true, message: "like remove successfully" });
    } else {
      const res2 = await Post.updateOne(
        { _id: req.params.id },
        { $push: { likes: req.body.userId } }
      );
      res.status(200).json({ status: true, message: "post like successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
