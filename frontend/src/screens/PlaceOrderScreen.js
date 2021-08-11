import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const PlaceOrderScreen = () => {
  const cart = useSelector(state => state.cart)
  const { paymentMethod, shippingAddress, cartItems } = cart

  const itemsPrice = cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
  const shippingPrice = itemsPrice > 100 ? 0 : 100
  const taxPrice = Number((.05 * itemsPrice).toFixed(2))

  const placeOrderHandler = () => {
    console.log('placeorder');
  }

  return (
    <div className='row'>
      <CheckoutSteps step1 step2 step3 step4 />
      <div class="col-lg-8 col-md-12">
					<div class="step last">
						<h3>1. Information</h3>
            <div className="box_general summary">
              <ul>
                <li class="clearfix"><em>Address: </em>  <span>{shippingAddress.address}</span></li>
                <li class="clearfix"><em>City:</em> <span>{shippingAddress.city}</span></li>
                <li class="clearfix"><em>Country:</em> <span>{shippingAddress.country}</span></li>
                <li class="clearfix"><em>Postal Code:</em> <span>{shippingAddress.postalCode}</span></li>
              </ul>
            </div>
						<h3>2. Payment Method</h3>
            <div className="box_general summary">
              <ul>
                <li class="clearfix"><em>Method: </em>  <span>{paymentMethod}</span></li>
              </ul>
            </div>
						<h3>3. Order Summary</h3>
            <div class="box_general summary">
              <ul>
              {cartItems.length === 0 ? <h3>Your cart is empty</h3> : (
                cartItems.map((item, index) => {
                  return <li key={index} class="clearfix"><em>{`${item.qty}x ${item.name}`}</em>  <span>${item.qty * item.price}</span></li>

                })
              ) }
              </ul>
              <ul>
                <li class="clearfix">
                  <em><strong>Subtotal</strong></em>  
                  <span>${itemsPrice}</span>
                </li>
                <li class="clearfix">
                  <em><strong>Shipping</strong></em> 
                  <span>${shippingPrice}</span>
                </li>
                <li class="clearfix"><em><strong>Tax</strong></em>  <span>${taxPrice}</span></li>
                
              </ul>
              <div class="total clearfix">TOTAL <span>${itemsPrice + shippingPrice + taxPrice}</span></div>
              <div class="form-group">
                  <label class="container_check">Register to the Newsletter.
                    <input type="checkbox" checked=""/>
                    <span class="checkmark"></span>
                  </label>
                </div>
              
              {/* <a href="confirm.html" class="btn_1 full-width">Confirm and Pay</a> */}
              <div class="text-center">
                  <input disabled={cartItems.length === 0} type="submit" value="Place Order" class="btn_1 full-width" onClick={placeOrderHandler} />
              </div>
            </div>
					</div>
				</div>
    </div>
  )
}

export default PlaceOrderScreen
