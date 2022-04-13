const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentController')

router.route('/payment')
    .get(paymentCtrl.getPayments)
    .post(paymentCtrl.createPayment)


module.exports = router
