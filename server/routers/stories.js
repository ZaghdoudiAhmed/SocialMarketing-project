var express = require("express");
var multer = require("multer");

var fs = require("fs");
var path = require("path");
var Story = require("../models/stories");

var router = express.Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/stories/");
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
router.post("/", upload.single("Photo"), (req, res) => {
  var nextDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  new Story({
    Creator: req.body.Creator,
    Photo: req.file.originalname,
    Date_fin: nextDate,
  })
    .save()
    .then((newstory) => {
      Story.populate(newstory, "Creator", (err, populatedstory) => {
        res.json(populatedstory);
      });
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
      // if (stories.Date_fin >= datenow) {
      //   res.json(stories);
      // } else {
      //   res.json("no active stories");
      // }
    });
});


module.exports = router;
