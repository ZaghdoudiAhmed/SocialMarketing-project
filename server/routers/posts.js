var express = require("express");
var multer = require("multer");

var fs = require("fs");
var path = require("path");

var router = express.Router();

var Post = require("../models/posts");
var User = require("../models/user");
var Comment = require("../models/comment");

//  Storing uploaded files
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/uploads/posts");
  },
  filename: (req, file, cb) => {
    //cb(null, new Date().toISOString() + file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/", function (req, res, next) {
  Post.find({})
    .populate("Creator")
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      }
      res.json(posts);
    });
});

router.get("/friendsposts/:currentUser", async (req, res) => {
  const user = User.findById(req.params.currentUser);
  const friendsposts = await Promise.all(
    user.followings.map((friendId) => {
      return Post.find({ Creator: friendId }).populate("Creator");
    })
  );
  const yourposts = Post.find({ Creator: req.params.currentUser }).populate(
    "Creator"
  );

  const totalposts = [];
  totalposts.push(friendsposts);
  totalposts.push(yourposts);
  res.json(totalposts);
});
// Creating post
router.post("/", upload.single("Photo"), (req, res) => {
  if(!req.file){
    new Post({
      Description: req.body.Description,
      Creator: req.body.Creator,
    }).save().then((newpost) => {
      Post.populate(newpost, "Creator", (err, populatedpost) => {
        res.json(populatedpost);
      });
    });
  }
  else{
 new Post({
    Description: req.body.Description,
    Creator: req.body.Creator,
    Photo: req.file.originalname,
  }).save().then((newpost) => {
      Post.populate(newpost, "Creator", (err, populatedpost) => {
        res.json(populatedpost);
      });
    });


  }
 
    
    
});

//Update Post
router.put("/:id", upload.single("Photo"), (req, res) => {
  //parameter get id
  const { id } = req.params;
  //parameter POST
  const { Description } = req.body;
  const Photo = req.file.originalname;
  const Datenow = Date.now();
  //Update Data
  const post = Post.findOneAndUpdate(
    { _id: id },
    {
      Description: Description,
      Photo: Photo,
      Date_creation: Datenow,
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

router.put("/epingle/:id", (req, res) => {
  const post = Post.findOneAndUpdate(
    { _id: req.params.id },
    { Epingl??: true }
  ).catch((err) => {
    return err;
  });
  res.json("post epingl?? ");
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
        // const comments = Comment.find({ Post_id: Post._id });
        Comment.deleteMany({ Post_id: Post._id }).exec();
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
  Post.find({ Creator: req.params.id })
    .populate("Creator")
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      }
      res.json(posts);
    });
});

///////////////////////////////////////////// Likes in array //////////////////////////

// like  a post
router.put("/:id/like", async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (
    !post.Likes.includes(req.body.userId) &&
    !post.Dislikes.includes(req.body.userId)
  ) {
    await post.updateOne({ $push: { Likes: req.body.userId } });
    res.json("the post has been liked");
  } else if (
    post.Dislikes.includes(req.body.userId) &&
    !post.Likes.includes(req.body.userId)
  ) {
    await post.updateOne({ $pull: { Dislikes: req.body.userId } });
    await post.updateOne({ $push: { Likes: req.body.userId } });
    res.json("you was disliking this post now you are liking it :D ");
  } else if (
    !post.Dislikes.includes(req.body.userId) &&
    post.Likes.includes(req.body.userId)
  ) {
    await post.updateOne({ $pull: { Likes: req.body.userId } });
    res.json("unlike post");
  }
});

//dislike a post
router.put("/:id/dislike", async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (
    !post.Dislikes.includes(req.body.userId) &&
    !post.Likes.includes(req.body.userId)
  ) {
    await post.updateOne({ $push: { Dislikes: req.body.userId } });
    res.json("the post has been disliked ");
  } else if (
    !post.Dislikes.includes(req.body.userId) &&
    post.Likes.includes(req.body.userId)
  ) {
    await post.updateOne({ $pull: { Likes: req.body.userId } });
    await post.updateOne({ $push: { Dislikes: req.body.userId } });

    res.json("you was liking this post now you are disliking it :D ");
  } else if (
    post.Dislikes.includes(req.body.userId) &&
    !post.Likes.includes(req.body.userId)
  ) {
    await post.updateOne({ $pull: { Dislikes: req.body.userId } });
    res.json("undislike the post ");
  }
});

module.exports = router;
