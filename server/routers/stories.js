var express = require("express");
var multer = require("multer");

var fs = require("fs");
var path = require("path");
var Story = require("../models/stories");
var User = require("../models/user");

var router = express.Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/uploads/stories");
  },
  filename: (req, file, cb) => {
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

// adding a story
router.post("/", upload.single("url"), (req, res) => {
  var nextDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  new Story({
    Creator: req.body.Creator,
    url: req.file.originalname,
    Date_fin: nextDate,
  })
    .save()
    .then((newstory) => {
      Story.populate(newstory, "Creator", (err, populatedstory) => {
        res.json(populatedstory);
      });
    });
});

//get all stories
router.get("/", function (req, res, next) {
  Story.find({})
    .populate("Creator")
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      }
      res.json(posts);
    });
});

//get active stories
router.get("/activestory/:idcreator", (req, res) => {
  const datenow = new Date(Date.now());
  Story.find({ Creator: req.params.idcreator })
    .populate("Creator")
    .then((stories) => {
      let activestories = stories.filter(
        (storie) => storie.Date_fin >= datenow
      );
      res.json(activestories);
    });
});

//get stories of friends
router.get("/:userid", async (req, res) => {
  const id = req.params.userid;
  const datenow = new Date(Date.now());

  const user = await User.findById(id);

  const friends = await Promise.all(
    user.followings.map((friendId) => {
      Story.find({ Creator: friendId })
        .populate("Creator")
        .then((stories) => {
          let activestories = stories.filter(
            (storie) => storie.Date_fin >= datenow
          );
          res.json(activestories);
        });
    })
  );
});

module.exports = router;
