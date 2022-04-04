const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler')
exports.searchByQueryType =asyncHandler( async (req, res) => {
	// const { type, query } = req.body;
    let query;
    let uiValues = {
        filtering: {},
        sorting: {},
      };
    
    const reqQuery={ ...req.query};
    const removeFields=["sort"];

    // console.log(reqQuery);
    removeFields.forEach((val)=> delete reqQuery[val]);
    // console.log(reqQuery);
    let queryStr = JSON.stringify(reqQuery);
    // console.log(queryStr); 
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
      );
      //console.log(queryStr); 
    query= Product.find(JSON.parse(queryStr));
    if(req.query.sort){
        const sortByArr = req.query.sort.split(",");

        sortByArr.forEach((val) => {
          let order;
    
          if (val[0] === "-") {
            order = "descending";
          } else {
            order = "ascending";
          }
    
          uiValues.sorting[val.replace("-", "")] = order;
        });
    
    const sortByStr = sortByArr.join(" ");
    
        query = query.sort(sortByStr);
      } else {
        query = query.sort("-productPrice");
      }
    const products = await query;
    console.log(products)
    const maxPrice = await Product.find()
    .sort({ productPrice: -1 })
    .limit(1)
    .select("-_id productPrice");

  const minPrice = await Product.find()
    .sort({ productPrice: 1 })
    .limit(1)
    .select("-_id productPrice");

  uiValues.maxPrice = maxPrice[0].productPrice;
  uiValues.minPrice = minPrice[0].productPrice;

  res.status(200).json({
    success: true,
    data: products,
    uiValues,
  });

});