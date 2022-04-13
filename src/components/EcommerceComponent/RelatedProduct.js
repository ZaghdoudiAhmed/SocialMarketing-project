import React from 'react';

export default function RelatedProduct(product) {
  return (
    <>
   <div className="gap no-bottom">
  <div className="section-heading">
    <h2>Related Products</h2>
  </div>
  <div className="row remove-ext-50">
    <div className="col-lg-3 col-sm-6">
      <div className="product-box">
        <figure>
          <span className="new">New</span>
          <img src={`http://localhost:3000/${product.product_id+product.images?.name}`} />
          <ul className="cart-optionz">
            <li><a href="#" title="Add Cart" data-toggle="tooltip"><i className="ti-shopping-cart" /></a></li>
            <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i className="ti-eye" /></a></li>
            <li><a href="#" title="Wishlist" data-toggle="tooltip"><i className="ti-heart" /></a></li>
            <li><a href="#" title="Compare" data-toggle="tooltip"><i className="ti-split-v-alt" /></a></li>
          </ul>
        </figure>
        <div className="product-name">
          <h5><a href="#" title={product.title}>{product.title}</a></h5>
          <ul className="starz">
            <li><i className="fa fa-star" /></li>
            <li><i className="fa fa-star" /></li>
            <li><i className="fa fa-star" /></li>
            <li><i className="fa fa-star" /></li>
            <li><i className="fa fa-star" /></li>
          </ul>
          <div className="prices">
            ${product.price}
          </div>
        </div>
      </div>
    </div>
    
  </div>
</div>{/* related products */}

    </>
  );
}
