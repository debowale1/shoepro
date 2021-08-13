import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { paymentMethod, shippingAddress, cartItems } = cart

  const itemsPrice = cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
  const shippingPrice = itemsPrice > 100 ? 0 : 100
  const taxPrice = Number((.05 * itemsPrice).toFixed(2))
  const totalPrice = itemsPrice + shippingPrice + taxPrice

  const orderCreate = useSelector(state => state.orderCreate)
  const {success, order, error } = orderCreate
  useEffect(() => {
    if(success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      taxPrice,
      shippingPrice, 
      totalPrice
    }))
  }

  return (
    <div className='row'>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="col-lg-8 col-md-12">
					<div className="step last">
						<h3>1. Information</h3>
            <div className="box_general summary">
              <ul>
                <li className="clearfix"><em>Address: </em>  <span>{shippingAddress.address}</span></li>
                <li className="clearfix"><em>City:</em> <span>{shippingAddress.city}</span></li>
                <li className="clearfix"><em>Country:</em> <span>{shippingAddress.country}</span></li>
                <li className="clearfix"><em>Postal Code:</em> <span>{shippingAddress.postalCode}</span></li>
              </ul>
            </div>
						<h3>2. Payment Method</h3>
            <div className="box_general summary">
              <ul>
                <li className="clearfix"><em>Method: </em>  <span>{paymentMethod}</span></li>
              </ul>
            </div>
						<h3>3. Order Summary</h3>
            <div className="box_general summary">
              <ul>
              {cartItems.length === 0 ? <h3>Your cart is empty</h3> : (
                cartItems.map((item, index) => {
                  return <li key={index} className="clearfix"><em>{`${item.qty}x ${item.name}`}</em>  <span>${item.qty * item.price}</span></li>

                })
              ) }
              </ul>
              <ul>
                <li className="clearfix">
                  <em><strong>Subtotal</strong></em>  
                  <span>${itemsPrice}</span>
                </li>
                <li className="clearfix">
                  <em><strong>Shipping</strong></em> 
                  <span>${shippingPrice}</span>
                </li>
                <li className="clearfix"><em><strong>Tax</strong></em>  <span>${taxPrice}</span></li>
                
              </ul>
              <div className="total clearfix">TOTAL <span>${totalPrice}</span></div>
              
              {error && <p>{error}</p> }
              <div className="text-center">
                  <input disabled={cartItems.length === 0} type="submit" value="Place Order" className="btn_1 full-width" onClick={placeOrderHandler} />
              </div>
            </div>
					</div>
				</div>
    </div>
  )
}

export default PlaceOrderScreen
