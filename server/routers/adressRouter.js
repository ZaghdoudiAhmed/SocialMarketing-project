const express = require('express');
// const { requireSignin, userMiddleware } = require('../common-middleware');
const addressCtrl= require('../controllers/addressController');
const router = express.Router();


router.post('/user/address/create', addressCtrl.createAddress);
router.get('/user/address/get/:id', addressCtrl.retreiveAddressById);
module.exports = router;