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
                    ///console.log(data)
                 
                     prodID = data
                    
                    category = data.category
                   //// console.log(category);
                    
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
           
           

            await Product.find({},{category :req.params.name})
            .then(data=>{
                if(!data){
                    return res.status(404).json({msg:'product is not found !'})
                }else{ 
                   
                    //console.log(data.category)
                    let result = res.json({data})
                    ////console.log(data)
                    return result
                }
            })

        } catch(err){
            return res.status(500).json({msg: err.message})  
        }

    },
    retrieveProductByCateg:async(req,res)=>{
        try{
            const categ = req.params.categorie;
            await Product.find({productCategory: categ}) 
            .then(data =>{
                if(!data){
                    return res.status(404).json({msg:'product is not found !'})
                }else{
                   
                    
                    return res.json({data})
                }
            })

        }catch(err){
            return res.status(500).json({msg: err.message})  
        }

    },
    retrieveProductByUser:async(req,res)=>{
        try{
            const nomuser=req.params.name;
            await Product.find({userName:nomuser})
            .then(data =>{
                if(!data){
                    return res.status(404).json({msg:'product is not found !'})
                }else{
                   
                    
                    return res.json({data})
                }
            })

        }catch(err){
            return res.status(500).json({msg: err.message}) 
        }

    },
    retrieveProductShop:async(req,res)=>{
        try{
            const nomuser=req.params.name;
            await Product.find({userName:{$ne:nomuser}})
            .then(data =>{
                if(!data){
                    return res.status(404).json({msg:'product is not found !'})
                }else{
                   
                    
                    return res.json({data})
                }
            })

        }catch(err){
            return res.status(500).json({msg: err.message}) 
        }

    },
    createProduct: async(req, res) =>{
        ////console.log(req.body);
        try {
        let product = new Product();
        product.userName=req.body[0].userName;
		product.productName = req.body[1].productName;
		product.productDesc = req.body[2].productDesc;
		product.productPrice = req.body[4].productPrice;
		product.productCategory = req.body[5].productCategory;
		product.productQty = req.body[6].productQty;
        product.ProductImage=req.body[7].ProductImage;
        product.userId=req.body[3].userId;
        await product.save();
       //// console.log(product);

		res.json({
			successMessage: `${req.body[0].productName} was created`,
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
                    ///console.log(data)
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
                 var data ={
                "productName": req.body[0].productName,
                "productDesc":req.body[1].productDesc,
                "productPrice":req.body[2].productPrice,
                "productCategory":req.body[3].productCategory,
                "productQty":req.body[4].productQty,
                "ProductImage":req.body[5].ProductImage,
                }
                await Product.updateOne({ "_id": id },{ $set: data })
                res.json({
                    successMessage: 'Product successfully updated',
                }); 
    },
   
    
}


module.exports = productCtrl