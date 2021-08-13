import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({match}) => {

  const orderId = match.params.id

  const dispatch = useDispatch()

  
  const orderDetails = useSelector(state => state.orderDetails)
  const { loading, order, error } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [])
  

  return (
    <div className='row'>
      {loading ? <Loader /> : error ? <p>{error}</p> : <>
        <div className="col-lg-12 col-md-12">
        <h1>Order: {order._id}</h1>
					<div className="step last">
						<h3>1. User</h3>
            <div className="box_general summary">
              <ul>
                <li className="clearfix"><em>Name: </em>  <span>{order.user.name}</span></li>
                <li className="clearfix"><em>Email:</em> <span>{order.user.email}</span></li>
                <li className="clearfix"><em>Delivered:</em> <span>{order.isDelivered ? 'Yes' : 'No'}</span></li>
              </ul>
            </div>
						<h3>2.Address Information</h3>
            <div className="box_general summary">
              <ul>
                <li className="clearfix"><em>Address: </em>  <span>{order.shippingAddress.address}</span></li>
                <li className="clearfix"><em>City:</em> <span>{order.shippingAddress.city}</span></li>
                <li className="clearfix"><em>Country:</em> <span>{order.shippingAddress.country}</span></li>
                <li className="clearfix"><em>Postal Code:</em> <span>{order.shippingAddress.postalCode}</span></li>
              </ul>
            </div>
						<h3>3. Payment Method</h3>
            <div className="box_general summary">
              <ul>
                <li className="clearfix"><em>Method: </em>  <span>{order.paymentMethod}</span></li>
                <li className="clearfix"><em>Paid: </em>  <span>{order.isPaid ? 'Yes' : 'No'}</span></li>
              </ul>
            </div>
						<h3>4. Order Summary</h3>
            <div className="box_general summary">
              <ul>
              {order.orderItems.length === 0 ? <h3>Order is empty</h3> : (
                order.orderItems.map((item, index) => {
                  return <li key={index} className="clearfix"><em>{`${item.qty}x ${item.name}`}</em>  <span>${item.qty * item.price}</span></li>

                })
              ) }
              </ul>
              <ul>
                <li className="clearfix">
                  <em><strong>Subtotal</strong></em>  
                  <span>${order.itemsPrice}</span>
                </li>
                <li className="clearfix">
                  <em><strong>Shipping</strong></em> 
                  <span>${order.shippingPrice}</span>
                </li>
                <li className="clearfix"><em><strong>Tax</strong></em>  <span>${order.taxPrice}</span></li>
                
              </ul>
              <div className="total clearfix">TOTAL <span>${order.totalPrice}</span></div>
              
              
              {/* <div className="text-center">
                  <input disabled={cartItems.length === 0} type="submit" value="Place Order" className="btn_1 full-width" onClick={placeOrderHandler} />
              </div> */}
            </div>
					</div>
				</div>
      </> }
      
    </div>
  )
}

export default OrderScreen
