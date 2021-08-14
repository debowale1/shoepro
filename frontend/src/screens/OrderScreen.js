import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({match}) => {

  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  
  const orderDetails = useSelector(state => state.orderDetails)
  const { loading, order, error } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading:loadingPay, success:successPay } = orderPay

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/v1/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&locale=en_US`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    } 

    // addPayPalScript()

    if(!order || successPay){
      dispatch({type: ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
      if(!window.paypal){
        addPayPalScript()
      }else{
        setSdkReady(true)
      }
    }

  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
  

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
              
              {!order.isPaid && (
                <>
                <div>{loadingPay && <Loader />} </div>
                <div>{!sdkReady ? <Loader /> : (
                  <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                )} </div>
                </>
              )}
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
