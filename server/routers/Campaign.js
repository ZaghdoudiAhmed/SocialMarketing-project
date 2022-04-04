var express = require('express');
var router = express.Router();
const compaign = require('../models/compaign')

router.post('/compaign/add',async (req, res) =>
 {
   const data = req.body;
   const compaign1 = new compaign(
    {
     title: data[0].title,
     description: data[0].description,
     nbr_total_dons: data[0].nbredons,
     chef: data[0].chef,
     type_don:data[0].type,
     lacalisation : data[2].loc,
     image :data[1].image ,
     date_debut :data[3].time[0],
     date_fin :data[3].time[1],
    }
);  

  await compaign1.save(); 
 }
);
router.get('/compaign/getcompaign',async (req, res) => {
    const compaign1= await compaign.find() ;
    res.send(compaign1);
})

router.post('/compaign/GetData', async (req, res) =>{
  const compaign1= await compaign.find()
   const  data =[]
      for (var i = 0; i < compaign1.length; i++) {
          var sdate = new Date(compaign1[i].date_debut);
          var edate = new Date(compaign1[i].date_fin);
          compaign1[i].date_debut = (new Date(+sdate - (sdate.getTimezoneOffset() * 60000)));
          compaign1[i].date_fin = (new Date(+edate - (edate.getTimezoneOffset() * 60000)));
       var o ={
         "Id":compaign1[i]._id,
         "Subject":compaign1[i].title,
         "StartTime": compaign1[i].date_debut,
         "EndTime": compaign1[i].date_fin,
         "Description":compaign1[i].description
       }
       data.push(o);
      }
     /// console.log( data);
      res.send( data);

});
router.post("/compaign/BatchData", async (req, res) =>{
  var eventData = [];
  if (req.body.action === "insert" || (req.body.action === "batch" && req.body.added.length > 0)) {
      (req.body.action === "insert") ? eventData.push(req.body.value) : eventData = req.body.added;
     //// console.log(eventData)
      for (var a = 0; a < eventData.length; a++) {
          eventData[a].StartTime = new Date(eventData[a].StartTime);
          eventData[a].EndTime = new Date(eventData[a].EndTime);
      }
  }
  if (req.body.action === "update" || (req.body.action === "batch" && req.body.changed.length > 0)) {
      (req.body.action === "update") ? eventData.push(req.body.value) : eventData = req.body.changed;
      for (var b = 0; b < eventData.length; b++) {
         //// delete eventData[b].Id;
          eventData[b].StartTime = new Date(eventData[b].StartTime);
          eventData[b].EndTime = new Date(eventData[b].EndTime);
          /////console.log(eventData[b].Id);
          var data ={
            "title":eventData[b].Subject,
             "description":eventData[b].Description,
            "date_debut" :eventData[b].startTime,
             "date_fin":eventData[b].EndTime,
          }
       await compaign.updateOne({ "_id": eventData[b].Id }, { $set: data });
      }
  }
  if (req.body.action === "remove" || (req.body.action === "batch" && req.body.deleted.length > 0)) {

      (req.body.action === "remove") ? eventData.push({ Id: req.body.key }) : eventData = req.body.deleted;
      console.log(eventData);
      for (var c = 0; c < eventData.length; c++) {
        //// dbo.collection('ScheduleData').deleteOne({ "Id": eventData[c].Id });
       ///// delete eventData[b].Id
        console.log(eventData[c].Id)
       await compaign.deleteOne({ "_id": eventData[c].Id});
     
   } }
  /// console.log(req.body);
   res.send(req.body);
  });
module.exports = router;