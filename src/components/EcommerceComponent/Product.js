import React , { useEffect, useState } from 'react';

import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import{
  Paper ,Grid, makeStyles,Typography,Slider,TextField,FormControl,RadioGroup,FormControlLabel,Button,Radio, Card, CircularProgress, Container }from "@material-ui/core";
//npm install @mui/icons-material
// import { FavoriteBorderOutlined, SearchOutlined,ShoppingCartOutlined} from "@material-ui/icons";
import { Link , useNavigate,useParams } from "react-router-dom";
import Loading from './utils/loading/Loading';
import styled from "styled-components";
import ProductDataService from "../services/Product.service"
import { addToCart } from '../../cartmanagment';
// import ReactPaginate from  "react-pagination";
export default function Product(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const [product, setProduct] =useState();
  const [filterproducts, setFilterProducts] =useState();
  const useStyles = makeStyles({
    root: {
      marginTop: 20,
    },
    loader: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    paper: {
      marginBottom: "1rem",
      padding: "13px",
    },
    filters: {
      padding: "0 1.5rem",
    },
    priceRangeInputs: {
      display: "flex",
      justifyContent: "space-between",
    },
  });
  const classes = useStyles();
  
  const navigate = useNavigate();
  const [loadProduct , setLoadProduct] = useState("");
  const{ allproducts } = useSelector((state) => state);
 
  const params = useParams();

  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25, 75]);
  const [priceOrder, setPriceOrder] = useState("descending");

  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState("");
  const [pageNumber,setPageNumber]=useState(0)



  useEffect(() => {
   if (filterproducts){
    setProduct(filterproducts)
   }else{
    retrieveAllProducts();
   }


    setLoadProduct('done')
    
  },[loadProduct]);
  
  // const upateUIValues = (uiValues) => {
  //   // setSliderMax(uiValues.maxPrice);
  //   // console.log(uiValues.maxPrice)

  //   if (uiValues.filtering.productPrice) {
  //     let priceFilter = uiValues.filtering.productPrice;

  //     setPriceRange([Number(priceFilter.gte), Number(priceFilter.lte)]);
  //   }

  //   if (uiValues.sorting.productPrice) {
  //     let priceSort = uiValues.sorting.price;
  //     setPriceOrder(priceSort);
  //   }
  // };
    useEffect(() => {
  
    const fetchData = async () => {
      //setLoading(true);
      try {
        let query;

        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        if (sorting) {
          if (query.length === 0) {
            query = `?sort=${sorting}`;
          } else {
            query = query + "&sort=" + sorting;
          }
        }

        // const { data } = await axios({
        //   method: "GET",
        //   url: `/api/product/search${query}`,
          
        // });
        // console.log(data)
        ProductDataService.getProductsByFilter(query)
        .then(response =>{
          
          console.log(response.data)

          setFilterProducts(response.data.data);
          // console.log("added filterd product")
           setLoadProduct('not done')
          // setLoading(false);
          //upateUIValues(response.uiValues);

          
        })
        .catch(e => {
          console.log(e);
        });
      }catch (error) {
        
        console.log(error.response.data);
      }


        
     
    };

    fetchData();

    //return () => cancel();
  }, [filter, params, sorting]);

 

  const retrieveAllProducts=() =>{
    ProductDataService.getAllProducts()
    
    .then(response =>{
      console.log(response.data.products)
      setProduct(response.data.products);
      
      
    })
    .catch(e => {
      console.log(e);
    });
  }

  const deleteProdByID=()=>{
    try{
      setLoading(true)
      ProductDataService.deleteProductByID(params.id)

      
      setLoading(false)
      navigate('/shop')


    }catch(err){
      alert(err.response.data.msg)
    }

  }
  

   const handlePriceInputChange = (e, type) => {
    let newRange;

    if (type === "lower") {
      newRange = [...priceRange];
      newRange[0] = Number(e.target.value);

      setPriceRange(newRange);
    }

    if (type === "upper") {
      newRange = [...priceRange];
      newRange[1] = Number(e.target.value);

      setPriceRange(newRange);
    }
  };
   const onSliderCommitHandler = (e, newValue) => {
   buildRangeFilter(newValue);
  };
  const onTextfieldCommitHandler = () => {
    buildRangeFilter(priceRange);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?productPrice[gte]=${newValue[0]}&productPrice[lte]=${newValue[1]}`;

    setFilter(urlFilter);

    navigate(urlFilter);
  };
  const handleSortChange = (e) => {
    setPriceOrder(e.target.value);

    if (e.target.value === "ascending") {
      setSorting("productPrice");
    } else if (e.target.value === "descending") {
      setSorting("-productPrice");
    }
  };
  const clearAllFilters = () => {
    
    setFilter("");
    setSorting("");
    setPriceRange([0, sliderMax]);
    //history.push("/");
  };
  // useEffect(() => {
   
  // }, [input])

 

  return (
    <>
    <Container className={classes.root}>
    <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Filters</Typography>
            <div className={classes.filters}>
              <Slider
                min={0}
                max={sliderMax}
                value={priceRange}
                valueLabelDisplay="auto"
                disabled={loading}
                onChange={(e, newValue) => setPriceRange(newValue)}
                onChangeCommitted={onSliderCommitHandler}
              />
              <div className={classes.priceRangeInputs}>
                <TextField
                  size="small"
                  id="lower"
                  label="Min Price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceInputChange(e, "lower")}
                  onBlur={onTextfieldCommitHandler}
                />

                <TextField
                  size="small"
                  id="upper"
                  label="Max Price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceInputChange(e, "upper")}
                  onBlur={onTextfieldCommitHandler}
                />
              </div>
               </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort By</Typography>

            <FormControl component="fieldset" className={classes.filters}>
              <RadioGroup
                aria-label="price-order"
                name="price-order"
                value={priceOrder}
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value="descending"
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Highest - Lowest"
                />

                <FormControlLabel
                  value="ascending"
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Lowest - Highest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button size="small" color="primary" onClick={clearAllFilters}>
          Clear All
        </Button>
      </Paper>    
      {/* <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          products?.map((products,i) => (
            <Grid item key={products._id} xs={12} sm={6} md={4} lg={3}>
              <Card products={products} />
            </Grid>
          ))
        )}
      </Grid> */}
    </Container>
  
   
    
    <div className="row">
    { product?.map((item , i ) =>   
        <>
          <div className="col-lg-3 col-sm-6" key={i}>
            <div className="product-box">
              <figure>
                <span className="new">New</span>
                   <img 
                   src={`http://localhost:3000//images/${item?._id+`_`+item?.ProductImage}`} width={100} height={100}  /> 
                
                
                <ul className="cart-optionz">
                  <li><a title="Add Cart" data-toggle="tooltip"  onClick={(e)=>{
    e.preventDefault(); addToCart(item,dispatch)}}><i className="ti-shopping-cart"/></a></li>
                  <li><Link  to={`/detailProduct/${item?._id}`}><i className="ti-eye" /></Link></li>
                  <li><a href="#" title="Wishlist" data-toggle="tooltip"  deleteProdByID={deleteProdByID}><i className="ti-heart" /></a></li>
                  <li><Link  to={`/updateProd/${item?._id}`}><i className="ti-split-v-alt" /></Link></li>
                  
                </ul>
              </figure>
              <ul className="product-name">
            
                <h2 title={item?.productName}>{item?.productName}</h2>
              
                <div className="prices">
                  <span>{item?.productPrice} DT</span>
                </div>
                <div className="description">
                  <p>{item?.productDesc}</p>
                </div>
              </ul>
              <div className='row_btn'>
                {/* <button className="btn btn-primary" >Delete Product</button> */}
                {/* <Link className="btn btn-primary" to="#"> Buy</Link> */}
                {/* <Link className="btn btn-primary" to={'/detailProduct/${item?._id}'}> view</Link> */}

              </div>
            </div>
          </div>
          </>
          ) }
   
                  <div className="col-lg-12">
                    <ul className="paginationz">
                      <li className="prev"><a title href="#"><i className="fa fa-angle-left" /></a></li>
                      <li><a title href="#">01</a></li>
                      <li><a title href="#" className="active">02</a></li>
                      <li><a title href="#">03</a></li>
                      <li><a title href="#">04</a></li>
                      <li className="space">.......</li>
                      <li><a title href="#">21</a></li>
                      <li className="next"><a title href="#"><i className="fa fa-angle-right" /></a></li>
                    </ul>
                  </div>{/* pagination */}	
                </div>
    
    
    </>
  );
}