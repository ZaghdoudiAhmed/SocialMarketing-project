import React,{useState,useEffect} from 'react';
import Footer from './Footer';
import Navbar from './NavBar';
//import { useDispatch } from "react-redux";
//import { createProduct } from '../../actions/products';
import ProductDataService from "../services/Product.service";
import CategoryDataService from "../services/Category.service";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import UserService from "../services/User.service";
export default function AddProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgFile, imgFileSet] = useState([]);
    const [userName, setUserName] = useState('');
    const initialProductState={  
        userName,
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
    const currentUserId = localStorage.getItem("currentUser");
    const navigate = useNavigate();
    let handleNameChange=(e) =>{
      setUserName(e.target.value)
     
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
        ///console.log(name)
      };
      const onImageChange = (i) => {
        const reader = new FileReader();
        if (i.target.files && i.target.files.length) {
          const [file] = i.target.files;
          reader.readAsDataURL(file);
          reader.onload = () => {
            imgFileSet(reader.result);
          };
        }
      };
      useEffect(() => {
        UserService.getUserById(currentUserId)
        .then(response => {
          console.log(response.data)
          setUserName(response.data.name)
         
  
        
  
  
      })
      .catch(e => {
          console.log(e);
      });
      }, [currentUserId])
   

      
       let state = {data: []}
      
    const saveProduct = async () => {
      const FD = []
      let productName = document.getElementById('productName').value
      let productCatg =document.getElementById('productCategory').value
     
     
     
   
      
      
      FD.push({'userName': userName})
      FD.push({'productName': productName})
      FD.push({'productDesc':product.productDesc})
      FD.push({'userId':currentUserId})
      FD.push({'productPrice':product.productPrice})
      FD.push({'productCategory':productCatg})
      FD.push({'productQty':product.productQty})
    console.log(imgFile);
      FD.push({'ProductImage':imgFile})
  console.log(FD)
       ProductDataService.createProduct(FD)
        .then(response =>{
          

          setSubmitted(true);
          console.log("done");
          navigate("/shophome/"+ currentUserId);

          
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
    <div className="gap100 mi">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
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
                              id="name"
                              required="required"
                              value={userName}
                              
                              name="userName"
                              onChange={(e) => handleNameChange(e)}
                            />
                            
                  <label className="control-label" htmlFor="input">User name </label>
                 
                </div>

                <div className="form-group">	
                  <input type="text" 
                        id="productName"
                         required="required"
                         value={product.productName}
                         
                         name="productName"
                         {...register("productName", {
                            required: {
                              value: true,message: "product Name is required",
                            },
                          })}
                          onChange={handleInputChange}
                         />
                  <label className="control-label" htmlFor="input">Product name </label>
                  <i className="mtrl-select" />
                  <i className="colorred">
                        {errors?.productName && errors.productName.message}
                  </i>
                </div>
                <div className="form-group">	
                  <input type="text" id="productDesc" required="required" 
                  value={product.productDesc} 
                  name="productDesc"
                  {...register("productDesc", {
                    required: {
                      value: true,message: "product Description is required",
                    },
                  })}
                  onChange={handleInputChange}
                  />
                  <label className="control-label" htmlFor="input">Description </label><i className="mtrl-select" />
                  <i className="colorred">
                        {errors?.productDesc && errors.productDesc.message}
                  </i>
                </div>		
                
                <div className="form-group">	
                  <input type="text" id="productPrice" required="required"
                    value={product.productPrice} 
                    name="productPrice"
                    {...register("productPrice", {
                      required: {
                        value: true,message: "product Price is required",
                      },
                    })}
                    onChange={handleInputChange}
                    />
                  <label className="control-label" htmlFor="input">Price </label><i className="mtrl-select" />
                  <i className="colorred">
                        {errors?.productPrice && errors.productPrice.message}
                  </i>
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
                    <label htmlFor="CoverImage">Product Cover Image</label>
                    <input required type="file"    onChange={onImageChange} className="ddd"/>
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
                  <button type="button" onClick={handleSubmit(saveProduct)} className="mtr-btn"><span>Create Product</span></button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3">
            <aside className="sidebar full-style">
              <div className="widget">
                <h4 className="widget-title">Categories</h4>
                <ul className="forum-static">
                {categories?.map((item,i)=>
                <li key={i}>
                <a  title>{item?.name}</a>
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
