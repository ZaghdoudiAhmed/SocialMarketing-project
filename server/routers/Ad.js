require("dotenv").config();
const express = require("express");
const app = express();
var router = express.Router();

const Ad = require('../models/ads')
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/uploads/ads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

//add an ad
router.post('/:id',upload.single("image"), async (req,res)=>{
    console.log(req.params.id)
    var link = ''
    if (req.body.link.length>0){
        link = req.body.link
    } else {
        link='/timeline/'+req.params.id
    }
    const date = new Date();
    console.log('------------------------------')
    console.log(req.body.duration)
    console.log(date)

    switch (req.body.duration) {
        case '1':
            date.setDate(date.getDate() + 1);
            break
        case '7':
            date.setDate(date.getDate()+ 7)
            break
        case '30':
            date.setDate(date.getDate()+ 30)
        default:
            console.log('default')
    }
    console.log(date)

   await new Ad({
        title : req.body.title,
        description : req.body.description,
        link: link,
        expiresAt:  date,
        image : req.file.filename,
        publisher : req.params.id
    }).save()
    res.status(201)
    res.send()
})
//edit ad
router.post('/edit/:id',upload.single('image'),async (req,res)=>{
    Ad.findById(req.params.id).then(ad=>{
            ad.title = req.body.title
            ad.description = req.body.description
            ad.link = req.body.link
            if(req.file.filename){
                ad.image=req.file.filename
            }
        ad.save()
        res.status(200)
        res.send(ad)
        })
})
//get all
router.get('/',async (req,res)=>{
    Ad.find({}).then(ads=>{
        res.send({ads})
    })
})

//get one randomly
router.get('/getOne',async (req, res)=>{
    Ad.count().exec(function (err, count){
        var random = Math.floor(Math.random()*count)

        Ad.findOne().skip(random).exec(function (err, ad){
            if(ad){
            ad.views++;
            ad.save()
            }
            console.log(ad)
            res.send({ad})
            }
        )
    })
})

//adding clicks
router.put('/addClick', async (req, res)=>{
    Ad.findById(req.body.id).then(ad=>{
        ad.clickes++
        ad.save()
        res.status(200);
        res.send({success: true})

    })
})

router.delete('/:id', async(req,res)=>{{
    Ad.deleteOne({_id: req.params.id}).then(
            () => {
                res.status(200)
                res.send({ ok: true })
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );}
    })
module.exports = router;