import React , { useState, useEffect } from 'react';
import Navbar from './NavBar';
import { useParams, Link } from 'react-router-dom';
import ProductDataService from "../services/Product.service";
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import CategoryDataService from "../services/Category.service";
export default function EditProduct(props) {
 
  const [productImage, setProductImage] = useState(null);
	const [productName, setProductName] = useState('');
	const [productDesc, setProductDesc] = useState('');
	const [productPrice, setProductPrice] = useState('');
	const [productCategory, setProductCategory] = useState('');
	const [productQty, setProductQty] = useState('');
  const[categories,setCategories]=useState();
  const [loadCategories , setLoadCategories] = useState("")
  
let handleNameChange=(e) =>{
  setProductName(e.target.value)
 
}
let handlDescripChange=(e) =>{
  setProductDesc(e.target.value)
 
}


let handlPriceChange=(e) =>{
  setProductPrice(e.target.value)
 
}
let handlQuantiChange=(e) =>{
  setProductQty(e.target.value)
 
}
let handlCatgChange=(e) =>{
  setProductCategory(e.target.value)
 
}


const params = useParams();
const [selectedFile, setSelectedFile] = useState(null);
const [submitted, setSubmitted]= useState(false);
const navigate = useNavigate();
//const{product_id,title,description,content,price,category,quantity}=formData;


useEffect(() => {
  ProductDataService.getProductById(params.id)
  .then(response =>{
    
    setProductName(response.data.data.productName)
    setProductDesc(response.data.data.productDesc)
  
    setProductPrice(response.data.data.productPrice)
    setProductQty(response.data.data.productQty)
    setProductCategory(response.data.data.productCategory)
    setProductImage(response.data.data.ProductImage)
   

  })
  .catch(e => {
    console.log(e);
  });
  
  
  
}, [params.id]);




let state1 = {data: { CoverImage: "" }}
let handleImageCoverChange = ({ currentTarget: input }) => {
  console.log("here we goo ");
    const data = state1.data;
    data[input.name] = input.files[0];
    state1.data = data;
    
    }

  
  let state = {data: []}
  const handleImageChange = ({ currentTarget: input }) => {
    console.log("here we goo ");
      let data = state.data;
      for (let index = 0; index < input.files.length; index++) {
          const element = input.files[index];
          data.push(element);
          
      }
      state.data = data;
     
  }
  const saveProduct = async () => {
    
		const formData = new FormData();
	 formData.append('productImage', productImage);

		formData.append('productName', productName);
		formData.append('productDesc', productDesc);
		formData.append('productPrice', productPrice);
		formData.append('productCategory', productCategory);
		formData.append('productQty', productQty);
  
  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
}

ProductDataService.updateProduct(params.id , formData )
.then(response =>{
  console.log(response);
  navigate("/shop");
})
.catch(e => {
  console.log(e);
});
}






  return (
    <>
    <Navbar></Navbar>
    <div className="theme-layout">
    <section>
    <div className="gap100">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="forum-warper">
              <div className="post-filter-sec">
                <form method="post" className="filter-form">
                  <input type="post" placeholder="Search post" />
                  <button><i className="ti-search" /></button>
                </form>
                <div className="purify">
                  <span>filter by</span>
                  <select>
                    <option>Assending A-Z</option>
                    <option>Desending Z-A</option>
                    <option>Desending (date)</option>
                    <option>Asending (date)</option>
                  </select>
                  <a href="#" title>purify</a>
                </div>
              </div>
            </div>
            <div className="forum-form">
              <h5 className="f-title"><i className="ti-info-alt" /> edit product </h5>
            

              <form method="post">
             

                <div className="form-group">	
                  <input type="text" 
                        id="title"
                         required="required"
                         value={productName}
                         onChange={(e) => handleNameChange(e)}
                         name="productName"
                         />
                  <label className="control-label" htmlFor="input">Product name </label><i className="mtrl-select" />
                </div>
                <div className="form-group">	
                  <input type="text" id="productDesc" required="required" 
                  value={productDesc} 
                  onChange={(e) => handlDescripChange(e)}
                  name="productDesc"/>
                  <label className="control-label" htmlFor="input">Description </label><i className="mtrl-select" />
                </div>		
                
                <div className="form-group">	
                  <input type="text" id="productPrice" required="required"
                    value={productPrice} 
                    onChange={(e) => handlPriceChange(e)}
                    name="productPrice"/>
                  <label className="control-label" htmlFor="input">Price </label><i className="mtrl-select" />
                </div>		
                <div className="form-group">	
                  <input type="text" id="productQty" required="required"  
                   value={productQty} 
                   onChange={(e) => handlQuantiChange(e)}
                   name="productQty" />
                  <label className="control-label" htmlFor="input">Quantity </label><i className="mtrl-select" />
                </div>						
                <div className="form-group">	
                  <input type="text" id="productCategory" required="required"  
                   value={productCategory} 
                   onChange={(e) => handlCatgChange(e)}
                   name="productCategory" />
                  <label className="control-label" htmlFor="input">Category </label><i className="mtrl-select" />
                </div>			
                {/* <div className="form-group">	
                <img src={`http://localhost:3000/images${product_id+images}`}  /> 
                <input
                    type="file"
                     value={selectedFile}
                     multiple
                    onChange={handleImageChange}
                />
                <label className="control-label" htmlFor="input">product  Pictures</label><i className="mtrl-select" />
                </div> */}
                <div className="form-group">

                <img src={`http://localhost:3000/images/${params.id+`_`+productImage}`}  />  
              
                <input name="CoverImage" id="imageCover" required type="file" className="form-control" onChange={handleImageCoverChange} />
                    <label htmlFor="CoverImage">Product Cover Image</label>
                    
                </div>			
                {/* <div className="form-group">	
                  <select>
                    <option value="category">Category</option>
                    <option value="video">Video Hive</option>
                    <option value="themeforest">Themeforest</option>
                    <option value="canyon">Code Canyon</option>
                  </select>
                </div>  */}
               
                
                <div className="submit-btns">
                  <button type="button" className="mtr-btn"><span>Cancel</span></button>
                  <button type="button" onClick={saveProduct} className="mtr-btn"><span>update Product</span></button>
                </div>

              </form>
              
            </div>
          </div>
      </div>
    </div>
    </div>
    </section>
    </div>
    </>
  );
}
