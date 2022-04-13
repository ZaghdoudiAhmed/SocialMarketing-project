var express = require("express");

var Notification = require("../models/notification");

var router = express.Router();

//Adding a notification
router.post("/", async (req, res) => {
  const newnotification = new Notification(req.body);

  try {
    const savedNotifcation = await newnotification.save();
    res.status(200).json(savedNotifcation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:receiverId", async (req, res) => {
  Notification.find({
    receiver: req.params.receiverId,
  })
    .populate("receiver")
    .populate("sender")
    .exec((err, notifs) => {
      if (err) {
        res.json(err);
      }
      res.json(notifs);
    });
});

router.delete("/:receiverId", async (req, res) => {
  Notification.find({
    receiver: req.params.receiverId,
  })
    .deleteMany()
    .exec();
  res.json("done");
});

module.exports = router;
