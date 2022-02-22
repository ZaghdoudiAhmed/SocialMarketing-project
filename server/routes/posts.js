var express = require("express");
var multer = require("multer");

var fs = require("fs");
var path = require("path");

var router = express.Router();

var Post = require("../models/posts");

//  Storing uploaded files
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
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
  // res.send("respond with a resource");
  Post.find({}, (err, posts) => {
    if (err) {
      res.send("error get posts");
    }
    res.json(posts);
  });
});

// Creating post
router.post("/", upload.single("Photo"), (req, res) => {
  console.log(req.file);
  new Post({
    Description: req.body.Description,
    Private: req.body.Private,
    Creator: req.body.Creator,
    //  Photo: req.files.name,
    Photo: req.file.path,
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
