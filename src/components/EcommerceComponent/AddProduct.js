import React,{useState,useEffect} from 'react';
import Footer from './Footer';
import Navbar from './NavBar';
//import { useDispatch } from "react-redux";
//import { createProduct } from '../../actions/products';
import ProductDataService from "../services/Product.service";
import CategoryDataService from "../services/Category.service";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
export default function AddProduct() {
    const [selectedFile, setSelectedFile] = useState(null);
    const initialProductState={
       
        productName:"",
        productDesc:"",
       
        productPrice:"",
        productCategory:"",
        productQty:""
    }
    const[product, setProduct]= useState(initialProductState);
    // const[images, setImage]= useState
    const[categories,setCategories]=useState();
    const [loadCategories , setLoadCategories] = useState("")
    const [submitted, setSubmitted]= useState(false);
    const navigate = useNavigate();
    const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
        console.log(name)
      };
    
    let state1 = {data: { CoverImage: "" }}
    let handleImageCoverChange = ({ currentTarget: input }) => {
      console.log("here we goo ");
        const data = state1.data;
        data[input.name] = input.files[0];
        state1.data = data;
        
        }

      
       let state = {data: []}
      // const handleImageChange = ({ currentTarget: input }) => {
      //   console.log("here we goo ");
      //     let data = state.data;
      //     for (let index = 0; index < input.files.length; index++) {
      //         const element = input.files[index];
      //         data.push(element);
              
      //     }
      //     state.data = data;
         
      // }
    const saveProduct = async () => {
      const FD = new FormData()
      let productName = document.getElementById('productName').value
      let productCatg =document.getElementById('productCategory').value
      console.log(productCatg)
      console.log(state1.data);
      console.log(state.data);
     
     
   
    
      FD.append('productName',productName)
      FD.append('productDesc',product.productDesc)
      
      FD.append('productPrice',product.productPrice)
      FD.append('productCategory',productCatg)
      FD.append('productQty',product.productQty)
    
      FD.append('ProductImage' , state1.data.CoverImage)
    //   state.data.forEach((element) => {
    //     FD.append(element.name, element)
    //  });
    for (var pair of FD.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
  }
  
  //     //  var data={
  //     //    title:product.title,
  //     //    description:product.description,
  //     //    content:product.content,
  //     //    price:product.price,
  //     //    category:product.category,
  //     //    quantity:product.quantity};
       ProductDataService.createProduct(FD)
        .then(response =>{
          

          setSubmitted(true);
          console.log("done");
          navigate("/shop");

          
        })
        .catch(e => {
          console.log(e);
        });
       
      };
    useEffect(() => {
      CategoryDataService.getCategories()
      .then(response =>{
        // console.log(response.data);
        setLoadCategories('done!')
        setCategories(response.data);
      })
      .catch(e=>{
        console.log(e);
      })
     
    }, [loadCategories])
   
    

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
              <h5 className="f-title"><i className="ti-info-alt" /> Create new product </h5>
              <form method="post">
              
                {/* <div className="form-group">	
                  <input type="text" 
                        id="product_id"
                         required="required"
                         value={product.product_id}
                         onChange={handleInputChange}
                         name="product_id"
                         />
                  <label className="control-label" htmlFor="input"> Product id </label><i className="mtrl-select" />
                </div> */}

                <div className="form-group">	
                  <input type="text" 
                        id="productName"
                         required="required"
                         value={product.productName}
                         onChange={handleInputChange}
                         name="productName"
                         />
                  <label className="control-label" htmlFor="input">Product name </label><i className="mtrl-select" />
                </div>
                <div className="form-group">	
                  <input type="text" id="productDesc" required="required" 
                  value={product.productDesc} 
                  onChange={handleInputChange}
                  name="productDesc"/>
                  <label className="control-label" htmlFor="input">Description </label><i className="mtrl-select" />
                </div>		
                
                <div className="form-group">	
                  <input type="text" id="productPrice" required="required"
                    value={product.productPrice} 
                    onChange={handleInputChange}
                    name="productPrice"/>
                  <label className="control-label" htmlFor="input">Price </label><i className="mtrl-select" />
                </div>		
                <div className="form-group">	
                  <input type="text" id="productQty" required="required"  
                   value={product.productQty} 
                   onChange={handleInputChange}
                   name="productQty" />
                  <label className="control-label" htmlFor="input">Quantity </label><i className="mtrl-select" />
                </div>		
                <div className="select-container">
                <select name="category" 
                    
                    id="productCategory"> 
                <option value="category" >Category</option>
                {categories?.map((item,i)=>
                <option value={item?.name}> {item?.name}</option>
                )}
                
                </select>	
                
                </div>	
                	
                <div className="form-group">	
                  <input type="text" id="productCategory" required="required"  
                   value={product.productCategory} 
                   onChange={handleInputChange}
                   name="productCategory" />
                  <label className="control-label" htmlFor="input">Category </label><i className="mtrl-select" />
                </div>			
                
                <div className="form-group">
                    <label htmlFor="CoverImage">Product Cover Image</label>
                    <input name="CoverImage" id="imageCover" required type="file" className="form-control" onChange={handleImageCoverChange} />
                </div>			
                {/* <div className="form-group">	
                  <select>
                    <option value="category">Category</option>
                    <option value="video">Video Hive</option>
                    <option value="themeforest">Themeforest</option>
                    <option value="canyon">Code Canyon</option>
                  </select>
                </div> */}
               
                
                <div className="submit-btns">
                  <button type="button" className="mtr-btn"><span>Cancel</span></button>
                  <button type="button" onClick={saveProduct} className="mtr-btn"><span>Create Product</span></button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3">
            <aside className="sidebar full-style">
              <div className="widget">
                <h4 className="widget-title">Categories</h4>
                <Link href='/categories' underline="hover">
                  {'Categories'}
                </Link>
                <ul className="forum-static">
                {categories?.map((item,i)=>
                <li key={i}>
                <a href="#" title>{item?.name}</a>
                <span>13</span>
              </li>
    )}
                  
                  
                </ul>
              </div>
              
            </aside>	
          </div>
        </div>
      </div>
    </div>
  </section>
  
</div>

    <Footer></Footer>
   
    
    </>
  );
}
