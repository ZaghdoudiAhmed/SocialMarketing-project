require('dotenv').config()
const express = require('express')
const app = express();
var router = express.Router();

const User = require('../models/user')
const passport = require('passport')



const{getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser} = require('./auth/autnetificate')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const {compareSync} = require("bcrypt");


//app.use(cors)
app.use(express.json())
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//register
router.post ('/register', async (req, res)=>{

        User.register(
            new User({email :req.body.email}),
            req.body.password,
            (err, user)=> {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    user.name = req.body.name
                    const token = getToken({_id:user._id})
                    const refreshToken = getRefreshToken({_id: user._id})
                    user.refreshToken.push({refreshToken})
                    user.save((err, user)=>{
                        if(err){
                            res.statusCode=500
                            res.send(err)}
                            else{
                                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                                res.send({success:true, token})
                            }
                    })
                }
            }
        )
})

app.use(express.json())

router.post('/login', passport.authenticate('local'),(req,res,next)=>{
   const token = getToken({_id : req.user._id})
    const refreshToken = getRefreshToken({_id : req.user._id})
    User.findById(req.user._id).then(

        user=>{
            console.log(user)
            user.refreshToken.push({refreshToken})
            user.save((err,user)=>{
                if(err){
                    res.statusCode=500
                    res.send(err)
                }else{
                    res.cookie(
                        "refreshToken", refreshToken, COOKIE_OPTIONS
                    )
                    res.send({success : true, token})
                }
            })
        },
        err=>next(err)
    )
})

router.post('/refreshToken', (req,res,next)=>{
    const {signedCookies = {} }= req
    const {refreshToken} = signedCookies

    if(refreshToken){
        try{
            const payload = jwt.verify(refreshToken, 'secretRefresh')
            const userId= payload._id
            User.findOne({_id : userId}).then(
                user=>{
                    if(user){
                        const tokenIndex = user.refreshToken.findIndex(
                            item => item.refreshToken === refreshToken
                        )
                        if(tokenIndex === -1){
                            res.statusCode = 401
                            res.send("Unauthorized")
                        }
                        else {
                            const token = getToken({_id: userId})
                            const newRefreshToken = getRefreshToken({_id:userId})
                            user.refreshToken[tokenIndex]={refreshToken : newRefreshToken}
                            user.save((err, user)=>{
                                if(err){
                                    res.statusCode = 500
                                    res.send(err)
                                }else{
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                    res.send({success : true, token})
                                }
                            })
                        }
                    }
                    else{
                        res.statusCode = 401
                        res.send("Unauthorized")
                    }
                },
                err =>next(err)
            )

        } catch (e) {
            res.statusCode = 401
            res.send("Unauthorized")
        }
    }
    else {
        res.statusCode = 401
        res.send("Unauthorized")
    }
})

router.get('/me', verifyUser, (req, res, next)=>{
    res.send(req.user)
})

router.get('/logout', verifyUser,(req,res, next)=>{
    const {signedCookies = {} }= req
    const {refreshToken }= signedCookies
    User.findById(req.user._id).then(
        user=>{
            const tokenIndex = user.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
            )
            if(tokenIndex !==-1){
                user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
            }

            user.save((err,user)=>{
                if(err){
                    res.statusCode = 500
                    res.send(err)
                }else {
                    res.clearCookie('refreshToken', COOKIE_OPTIONS)
                    res.send({success: true})
                }
            })
        },
        err =>next(err)
    )
})
module.exports = router;
