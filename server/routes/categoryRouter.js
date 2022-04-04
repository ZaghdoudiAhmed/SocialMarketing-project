const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryController')
// const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/authAdmin')


router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(categoryCtrl.createCategory)

router.route('/category/:id')
    
    .put( categoryCtrl.updateCategory)


module.exports = router