import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({history}) => {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  if(!shippingAddress){
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    //DISPATCH EVENT
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <main class="bg_gray">
      <div class="container margin_30">
      <CheckoutSteps step1 step2 step3 />
      {/* <!-- /page_header --> */}
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-8">
          <h5>Payment Method</h5>
          {/* {error && <h6 style={{ color: 'red'}}>{error}</h6> }
          {loading && <Loader/> } */}
          <div class="box_account">

            <div class="form_container">
              <form onSubmit={submitHandler}>
                <div className="row">
                  <div class="col-lg-12 col-md-12">
                    <div class="step middle payments">
                      <h3>2. Payment and Shipping</h3>
                      <ul>
                        <li>
                          <label class="container_radio">PayPal or Credit Card
                            <Link to="#0" class="info"></Link>
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              checked
                              id="PayPal"
                              value="PayPal"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span class="checkmark"></span>
                          </label>
                        </li>
                        <li>
                          <label class="container_radio">Stripe
                            <Link to="#" class="info"></Link>
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              id="Stripe"
                              value="Stripe"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span class="checkmark"></span>
                          </label>
                        </li>                        
                      </ul>
                  </div>
                    {/* <!-- /step --> */}
                </div>
                </div>
                <div class="text-center">
                  <input type="submit" value="Continue" class="btn_1 full-width" />
                </div>
              </form>
              
            </div>
            {/* <!-- /form_container --> */}
          </div>
          {/* <!-- /box_account --> */}
        </div>

      </div>
      {/* <!-- /row --> */}
      </div>
        {/* <!-- /container --> */}
    </main>
  )
}

export default PaymentScreen
