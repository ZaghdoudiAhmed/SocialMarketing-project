var express = require("express");
var router = express.Router();

var Comment = require("../models/comment");
var Post = require("../models/posts");

router.get("/", function (req, res, next) {
  res.json(Comment.find().populate("Post_id").exec());
  r;
});

// Adding a comment
router.post("/", (req, res) => {
  new Comment({
    Description: req.body.Description,
    //  Likes: req.body.Likes,
    //  Dislikes: req.body.Dislikes,
    Post_id: req.body.Post_id,
    Creator: req.body.Creator,
  })
    .save()
    .then((newcomment) => {
      Comment.populate(newcomment, "Creator", (err, populatedcomment) => {
        res.json(populatedcomment);
      });
    });
});

//Get all comments of a post
router.get("/post/:id", (req, res, next) => {
  Comment.find({ Post_id: req.params.id })
    .populate("Creator")
    .populate("comments.Creator")
    .exec((err, comments) => {
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

//A comment for a post
router.post("/post/:id/comment", async (req, res, next) => {
  //post id
  const id = req.params.id;
  // get the comment text and record post id
  const comment = new Comment({
    Body: req.body.Body,
    Post_id: id,
    Creator: req.body.Creator,
  });
  await comment.save().then((newcomment) => {
    Comment.populate(newcomment, "Creator", (err, populatedcomment) => {
      res.json(populatedcomment);
    });
  });
  // get the post
  const Relatedpost = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { Nbr_comments: 1 } }
  );

  //push the comment to the post.comments array

  Relatedpost.comments.push(comment);
  //save
  await Relatedpost.save((err) => {
    if (err) {
      console.log(err);
    }
    //  res.json(Relatedpost);
  });
  // res.json(comment);
});

// A comment replayed to an other comment
router.post("/post/:idpost/comment/:idcomment", async (req, res, next) => {
  // get the post by id
  const idpost = req.params.idpost;
  //Create the comment model
  const commentmodel = new Comment({
    Body: req.body.Body,
    Post_id: idpost,
    Creator: req.body.Creator,
  });

  const comment = await Comment.findOne({ _id: req.params.idcomment });

  comment.comments.push(commentmodel);
  await comment.save();
  Comment.populate(commentmodel, "Creator", (err, populatedcomment) => {
    if (err) {
      res.json(err);
    }
    res.json(populatedcomment);
  });
});

module.exports = router;
