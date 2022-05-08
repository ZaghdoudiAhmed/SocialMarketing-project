import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Navbar from './NavBar';
import { styled } from '@mui/material';
import Products from './Products';
import { Link } from 'react-router-dom';
export default function Shop() {
  return (
    <>
    <div className="theme-layout">
    <Navbar></Navbar>
      
   
    
    <section>
      <div className="gap100 toi">
        <div className="container mi">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop-page">
                <div className="shop-filter-sec">
                  
                  {/* <Link className="btn btn-primary" to="/addProd">Add New Product</Link> */}
                  <div class="row">
               <Products></Products>
               </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
   
  </div>
    
<script src="js/main.min.js"></script>
<script src="js/script.js"></script>
    </>
  );
}
