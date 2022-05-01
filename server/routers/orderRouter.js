const express = require('express');
const orderCtrl=require('../controllers/orderController');
const router = express.Router();



router.post('/user/order/create', orderCtrl.createOrder);
router.get('/user/order/get',orderCtrl.getOrder)
router.get('/user/order/getByid/:id',orderCtrl.getOrderById)


module.exports = router;