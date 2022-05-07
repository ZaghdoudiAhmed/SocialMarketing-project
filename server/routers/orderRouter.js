const express = require('express');
const orderCtrl=require('../controllers/orderController');
const router = express.Router();



router.post('/user/order/create', orderCtrl.createOrder);
router.get('/user/order/get',orderCtrl.getOrder)
router.get('/user/order/getByid/:id',orderCtrl.getOrderById)
router.get('/user/order/getByUser/:name',orderCtrl.retreiveOrderByUser);
router.put('/user/order/update/:id',orderCtrl.editStatus)

module.exports = router;