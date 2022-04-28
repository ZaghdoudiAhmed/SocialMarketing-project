var express = require("express");

var router = express.Router();
var Message = require("../models/message");

//Adding a message
router.post("/", async (req, res) => {
  const newMessage = new Message({
    sender: req.body.sender,
    text: req.body.text,
    conversation_id: req.body.conversationId,
  });

  try {
    const savedMessage = await newMessage.save().then((newmessage) => {
      Message.populate(newmessage, "sender", (err, populatedmessage) => {
        res.status(200).json(populatedmessage);
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Getting  messages of a conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversation_id: req.params.conversationId,
    }).populate("sender");
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
