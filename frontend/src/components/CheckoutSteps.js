import React from 'react'
import {Link} from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="page_header">
			<div className="breadcrumbs">
				<ul>
					<li>
            { step1 ? <Link to="/login">Sign In</Link> : <Link className="disabled-link" >Sign In</Link> }
          </li>
					<li>
            { step2 ? <Link to="/shipping">Shipping</Link> : <Link className="disabled-link" >Shipping</Link> }
          </li>
					<li>
            { step3 ? <Link to="/payment">Payment</Link> : <Link className="disabled-link" >Payment</Link> }
          </li>
					<li>
            { step4 ? <Link to="/placeorder">Place Order</Link> : <Link className="disabled-link" >Place Order</Link> }
          </li>
					{/* <li><Link to="#">Category</Link></li>
					<li>Page active</li> */}
				</ul>
		</div>
		{/* <h1>Sign In or Create an Account</h1> */}
			
	</div>
  )
}

export default CheckoutSteps
