const Comment = require("../models/Comment");

const router = require("express").Router();

// add

router.post("/add", async (req, res) => {
  try {
    const newComment = new Comment({
      comment: req.body.comment,
      postId: req.body.postId,
      userId: req.body.userId,
      username: req.body.username,
    });
    await newComment.save();
    res
      .status(200)
      .json({ status: true, message: "Comment added in post successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete

router.delete("/delete/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (comment) {
      Comment.findOneAndUpdate({ _id: req.params.id })
        .then(() => {
          res
            .status(200)
            .json({ status: true, message: "Comment update successfully" });
        })
        .catch((err) => {
          res.status(201).json(err);
        });
    } else {
      res.status(200).json({ status: false, message: "no comment found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//update

router.put("/update/:id", async (req, res) => {
  try {
    Comment.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Post Update successfully",
        });
      })
      .catch(() => {
        res.status(200).json(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//get comment by post id
router.get("/comment/:id", async (req, res) => {
  try {
    Comment.find({ postId: req.params.id }).then((comment) => {
      res.status(200).json({
        status: true,
        message: "Comments fetch successfully",
        data: comment,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
