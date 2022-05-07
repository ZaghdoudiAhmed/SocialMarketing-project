const router = require('express').Router()
const express = require('express')
const app = express()



app.use(express.static('public'));


const fileUpload = require('express-fileupload')
//const Products = require('../models/productModel')
const upload = require('../middleware/upload');
const productCtrl = require('../controllers/productController')

app.use(fileUpload());
// 
//router.post('/products',productCtrl.createProduct)
// router.post('/productsImg/:id',upload.single('productImage'),productCtrl.CreateProductImage)
router.post('/stats',  upload.none(), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.files, req.body)
 });
router.route('/products')
    .get(productCtrl.getProducts)
    .post(  productCtrl.createProduct)
router.route('/productbycatg/:categorie')
    .get(productCtrl.retrieveProductByCateg)
router.route('/productbyuser/:name')
     .get(productCtrl.retrieveProductByUser)
router.route('/shopbyuser/:name')
     .get(productCtrl.retrieveProductShop)
router.route('/products/:id')
    .delete(productCtrl.deleteProduct)
    .put(productCtrl.updateProduct)
    .get(productCtrl.getProductById)

  

module.exports = router