const Product = require('../models/productModel')
const Categories =require('../models/categoryModel');
var bodyParser = require('body-parser')
const fs = require('fs');
const { log } = require('console');

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async(req, res) =>{
        // console.log(req.body)
        console.log("all prod");
        try {
            const features = new APIfeatures(Product.find(), req.query)
            .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
            
        } catch (err) {

            return res.status(500).json({msg: err.message})
        }
    },
    getProductById:async(req, res) =>{
        try{
            const id =req.params.id; 
            // const category=req.params.name;
            const title =req.body.title;
            let category = ""
            let result = {}
            let prodID = {}
             await Product.findById(id)
            .then(data =>{
                if(!data){
                    return res.status(404).json({msg:'product is not found !'})
                }else{
                    console.log(data)
                 
                     prodID = data
                    
                    category = data.category
                    console.log(category);
                    
                    return res.json({data})
                }
            })
           
        } catch(err){
            return res.status(500).json({msg: err.message})
        }

       
    },
    retrieveRelatedProduct: async(req,res)=>{
        try{
            const id =req.params.id; 
            const name_catg =req.params.name;
           
           

            await Products.find({},{category :req.params.name})
            .then(data=>{
                if(!data){
                    return res.status(404).json({msg:'product is not found !'})
                }else{ 
                   
                    //console.log(data.category)
                    let result = res.json({data})
                    console.log(data)
                    return result
                }
            })

        } catch(err){
            return res.status(500).json({msg: err.message})  
        }

    },
    createProduct: async(req, res) =>{
        console.log(req.body);
        console.log(req.files);
	    const {
		productName,
		productDesc,
		productPrice,
		productCategory,
		productQty
	    } = req.body;
        try {
        let product = new Product();
		product.productName = productName;
		product.productDesc = productDesc;
		product.productPrice = productPrice;
		product.productCategory = productCategory;
		product.productQty = productQty;
        await product.save();
        var files = []
        
        var filekeys = Object.keys(req.files)
        filekeys.forEach(function(key){
            files.push(req.files[key])
        })
        let productPictures = []
        files.forEach((element) => {
            console.log(element.name);
            productPictures.push(element.name)
            product.ProductPath = 'images/'+product._id+'_'+element.name
            element.mv('public/images/'+product._id+'_'+element.name , function(err){
                if(err){
                    res.json({
                        "status" :"file not upload"
                    })
                }   
            })
        })
       
        product.ProductImage = productPictures;
		await product.save();
        console.log(product);

		res.json({
			successMessage: `${productName} was created`,
			product,
		});
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err.message})
        }
    },
    CreateProductImage:  async(req, res) =>{ 
        id = req.params.id
        console.log(id);
        console.log(req.files.productImage.name);
        Product.findOneAndUpdate(
            {_id : id },
            { $set : { "fileName" : req.files.productImage.name}},
            function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
    
                console.log(doc);
            }
        )
        await Product.findById(id)
           .then(data =>{
            // console.log(req.files);
            console.log(data);
            // data.fileName = req.files.name;
            // data.save()
                
            
        })
        // console.log(req.files);
        // 
        // .then(data =>{
        //     // console.log(req.files);
        //     console.log(data);
        //     data.fileName = req.files.name;
        //     data.save()
        //         
            
        // })
    }
    ,
    deleteProduct: async(req, res) =>{
        try {
            const id =req.params.id;
            await Product.findById(id)
            .then(data =>{
                if(!data){
                    return res.status(404).json({msg:'product is not found !'})
                }else{
                    console.log("data here");
                    console.log(data)
                    let img =data.ProductImage
                   // return res.json({img});
                    //const path='public/'+data.product_id+data.images.name
                    const path='public/'+data.ProductPath
                    console.log(path);
                    fs.unlink(path, (err) => {
                        if(err && err.code == 'ENOENT') {
                            //file doens't exist
                            console.info("File doesn't exist, won't remove it.");
                        } else if (err) {
                            //other errors, e.g. maybe we don't have enough permission
                            console.error("Error occurred while trying to remove file");
                        } else {
                            console.info(`removed`);
                        }
                      
                        //file removed
                      })
                     
                }
                })
            await Product.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
            // console.error(err)
            
        }
    },
    updateProduct: async(req, res) =>{
            const id =req.params.id
            
            await Product.findById(id)
            .then(data =>{
                if(!data){
                    return res.status(404).json({msg:'product is not found !'})
                }else{
                    if (req.files){
                        const path='public/'+data.ProductPath
                        console.log(path);
                        fs.unlink(path, (err) => {
                            if(err && err.code == 'ENOENT') {
                                console.info("File doesn't exist, won't remove it.");
                            } else if (err) {
                                console.error("Error occurred while trying to remove file");
                            } else {
                                console.info(`removed`);
                            }
                          })
                        var files = []
            
                        var filekeys = Object.keys(req.files)
                        filekeys.forEach(function(key){
                            files.push(req.files[key])
                        })
                
                        let productPictures = []
                        let patho = ''
                        files.forEach((element) => {
                            console.log(element.name);
                            productPictures.push(element.name)
                            data.ProductPath = 'images/'+data._id+'_'+element.name
                           
                            element.mv('public/images/'+data._id+'_'+element.name , function(err){
                                if(err){
                                    res.json({
                                        "status" :"file not upload"
                                    })
                                }   
                            })
                        })
                        console.log(productPictures);
                
                        Product.updateOne(
                            { _id : id },
                            { $set : { "ProductImage" : productPictures ,'ProductPath' : patho}}
                        );
                    }
                    console.log("data here");
                    console.log(data) 
             
                }
                })
                console.log("i ll update here ");
               
                await Product.findOneAndUpdate(id,req.body)
                res.json({
                    successMessage: 'Product successfully updated',
                }); 
    },
   
    
}


module.exports = productCtrl