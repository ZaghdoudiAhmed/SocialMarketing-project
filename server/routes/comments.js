var express = require("express");
var router = express.Router();

var Comment = require("../models/comment");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Adding a comment
router.post("/", (req, res, next) => {
  new Comment({
    Description: req.body.Description,
    //  Likes: req.body.Likes,
    //  Dislikes: req.body.Dislikes,
    Post_id: req.body.Post_id,
  }).save((err, newcomment) => {
    if (err) {
      console.log("error");
    } else {
      console.log(newcomment);
      res.json(" Comment :" + newcomment._id + "added");
    }
  });
});
//Get all comments of a post
router.get("/post/:id", (req, res, next) => {
  Comment.find({ Post_id: req.params.id }, (err, comments) => {
    if (err) {
      res.send("error get comments");
    }
    res.json(comments);
  });
});
// Deleting a comment
router.get("/delete/:id", (req, res, next) => {
  Comment.findOneAndRemove(
    {
      _id: req.params.id,
    },
    (err, Comment) => {
      if (err) {
        res.send("error removing");
      } else {
        res.json({
          success: true,
          message: "Deleted",
          data: Comment,
        });
      }
    }
  );
});

// Like a comment
router.post("/like/:id", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { Likes: 1 } }
  ).exec();
  res.json("done");
});

//Dislike a comment
router.post("/dislike/:id", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { Dislikes: 1 } }
  ).exec();
  res.json("done");
});

module.exports = router;
