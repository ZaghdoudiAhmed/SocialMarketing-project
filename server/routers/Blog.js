var express = require('express');
var router = express.Router();
const blog = require('../models/Blog')
const comment = require('../models/commentah')
const reply = require('../models/reply')
const mongoose = require("mongoose");
const { Schema } = mongoose;
router.get('/blog',async (req, res) => {

  const blog2=  await blog.find().populate('comments');
    ////console.log(blog2);
    res.send(blog2);
})
///add blog
router.post('/blog/addblog/:userid',async (req, res) =>
 {
  const userid = req.params.userid;
   const data= req.body;
  /// console.log(data);
   const blog1 =new blog({
    _id: new mongoose.Types.ObjectId(),
    title: data[0].title,
    description: data[0].description,
    image :data[1].image ,
    publisher:userid,
    date_publish : new Date(),
    comments: [],
    likes:0,
   });
   await blog1.save().then((blog1) => {res.json(blog1)}) 

 }
);
router.post('/reply/addreply/:userid',async (req, res) =>
 {
  const userid = req.params.userid;
   const x = req.body;
 ///  console.log(x);
   const reply1 =new reply({
    _id: new mongoose.Types.ObjectId(),
    desciption: x[0].post,
    date :new Date(),
    user :userid,
    comment : x[1],
   });
   await reply1.save().then((reply1) => {res.json(reply1)}) 

 }
);
router.get('/reply/getreply/:idcomment',async (req, res) =>
 {
   const x = req.params.idcomment;
  const reply1=  await reply.find({comment:x}).populate('user')
    // prints "The author is Ian Fleming"
    res.send(reply1);

 }
);
router.post('/comment/addcomment/:userid',async (req, res) =>
 {
  const userid = req.params.userid;
   const data = req.body;
   const comment1 =new comment({
    _id: new mongoose.Types.ObjectId(),
    subject:data[0].subject,
  desciption: data[0].message,
  reply :[],
  blog :data[1],
  publisher :userid,
   });
 
   await comment1.save().then((blog1) => {res.json(comment1)}) 

 }
);
router.get('/comment/getcomment/:idblog',async (req, res) =>

 {
   const x = req.params.idblog
  /// console.log(x);
  const comment1=  await comment.find({blog:x}).populate("blog").populate("publisher") ;
 /// console.log(comment1)
    res.send(comment1);

 });
 router.get('/comment/getcommentcount/:idblog',async (req, res) =>

 { const x = req.params.idblog
  const nbrcomment= await comment.count({blog:x});
 /// console.log(nbrcomment);
  res.send({nbrcomment});

 }
 );
 router.post('/comment/updatelikes/:idblog',async (req, res) =>

 { const x = req.params.idblog
  await blog.updateOne({_id:x},{$inc:{likes:1}});
 const nbrlikes= await blog.find({_id:x},{likes:1,_id:0});
  ///console.log(nbrlikes);
 }
 )
 router.get('/comment/totallikes/:idblog',async (req, res) =>

 { 
   const x = req.params.idblog
 const nbrlikes= await blog.find({_id:x},{likes:1,_id:0});
 /// console.log(nbrlikes);
  res.send(nbrlikes);
 }
 );
 router.delete('/reply/deletecomment/:idcomment',async (req, res) =>

 { 
   const x = req.params.idcomment
  /// console.log(x);
await comment.deleteOne({"_id":x});
await reply.deleteMany({"comment":x});
 })
module.exports = router;