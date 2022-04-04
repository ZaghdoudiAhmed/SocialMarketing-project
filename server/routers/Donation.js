var express = require('express');
var router = express.Router();
const donation = require('../models/donation')


/* GET users listing. */
router.get('/donation/listdonations',async (req, res) =>
 {
  const donation1= await donation.find() ;
  res.send(donation1);
 }
);
router.get('/donation/listdonationsbycategorie/:categorie',async (req, res) =>
 {
   const categorie = req.params.categorie;
  const donation1= await donation.find({category: categorie}) ;
  res.send(donation1);
 }
);
router.post('/donation/adddonation',async (req, res) =>
 {
   const x = req.body;
 
   const donation1 =new donation({
    title : req.body[0].title,
   donator: "ah",
  description: req.body[0].description,
  location: req.body[0].location,
  state: req.body[0].state,
  image: req.body[1].image,
  category: req.body[0].category,
  datecre :new Date(),
   });

   await donation1.save().then((data) => {res.json(data)}) 

 }
);
router.get('/donation/listdonationsbylocation',async (req, res) =>
 {
  const donation1= await donation.aggregate([{$group:{_id:"$location",nbr_donation:{$sum:1}}}]) ;
  res.send(donation1);
  
 }
);
router.get('/donation/listdonationbylocation/:location',async (req, res) =>
 {
  const location1= req.params.location; 
  const donation1= await donation.aggregate([{$match:{location:location1}}]) ;
  res.send(donation1);
 }
);
router.get('/donation/totaldonations',async (req, res) =>
 {
  const total= await donation.count();
  res.send({total});
 }
);
module.exports = router;