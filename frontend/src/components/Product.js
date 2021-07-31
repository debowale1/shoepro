import React from 'react'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <div className="col-6 col-md-4 col-xl-3">
    <div className="grid_item">
    <figure>
      <span className="ribbon off">-30%</span>
      <Link to={`/product/${product._id}`}>
        <img className="img-fluid lazy" src={product.images[0]} data-src={product.images[0]} alt=""/>
        <img className="img-fluid lazy" src={product.images[1]} data-src={product.images[1]} alt=""/>
      </Link>
      <div data-countdown="2019/05/15" className="countdown"></div>
    </figure>
    <Rating rating={product.rating} numReviews={product.numReviews}/>
    <Link to={`/product/${product._id}`}>
      <h3>{product.name}</h3>
    </Link>
    <div className="price_box">
      <span className="new_price">${product.price}</span>
      <span className="old_price">$60.00</span>
    </div>
    <ul>
      <li><a href="#0" className="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a></li>
      <li><a href="#0" className="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a></li>
      <li><a href="#0" className="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
    </ul>
  </div>
</div>
  )
}

export default Product
