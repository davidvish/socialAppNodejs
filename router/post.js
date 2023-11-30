const Post = require("../models/Post");

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
    const post = Post.findOne({_id:req.params.id})
    Post.findByIdAndUpdate({_id:req.params.id},{$set:req.body}).then(()=>{
        res.status(200).json({status:true, message:'Post Update successfully',data:post})
    }).catch(()=>{
        res.status(200).json({status:false,message:'Post not found'})
    })
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete post

//get all post

//get post detail by id

//get post any of user

module.exports = router;
