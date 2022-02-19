var express = require("express");
var router = express.Router();

var Post = require("../models/posts");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Creating post
router.post("/", (req, res, next) => {
  new Post({
    Description: req.body.Description,
    //  Likes: req.body.Likes,
    //  Dislikes: req.body.Dislikes,
    //  Love: req.body.Love,
    //  Nbr_comments: req.body.Nbr_comments,
    Private: req.body.Private,
    Creator: req.body.Creator,
  }).save((err, newpost) => {
    if (err) {
      console.log("error");
    } else {
      console.log(newpost);
      res.json(" Post :" + newpost._id + "added");
    }
  });
});

//Update Post
router.put("/:id", (req, res) => {
  //parameter get id
  const { id } = req.params;
  //parameter POST
  const { Description, Private, Creator } = req.body;
  //Update Data
  const post = Post.findOneAndUpdate(
    { _id: id },
    {
      Description: Description,
      Private: Private,
      //   Creator: Creator,
    }
  ).catch((error) => {
    return error;
  });
  res.json({
    success: true,
    data: post,
    message: "Updated ",
  });
});

// Removing post
router.get("/delete/:id", (req, res, next) => {
  Post.findOneAndRemove(
    {
      _id: req.params.id,
    },
    (err, Post) => {
      if (err) {
        res.send("error removing");
      } else {
        res.json({
          success: true,
          message: "Deleted",
          data: Post,
        });
      }
    }
  );
});

//Get all posts of a user with id
router.get("/all/:id", (req, res, next) => {
  Post.find({ Creator: req.params.id }, (err, posts) => {
    if (err) {
      res.send("error get posts");
    }
    res.json(posts);
  });
});

// Like a post
router.post("/like/:id", (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { Likes: 1 } }).exec();
  res.json("done");
});

//Dislike a post
router.post("/dislike/:id", (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { Dislikes: 1 } }
  ).exec();
  res.json("done");
});

//Love a post
router.post("/love/:id", (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { Love: 1 } }).exec();
  res.json("done");
});

module.exports = router;
