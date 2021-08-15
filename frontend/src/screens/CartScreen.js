import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ({match, location, history}) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId))
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
    <div className="container margin_30">
      <div className="page_header">
        <div className="breadcrumbs">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Category</a></li>
            <li>Page active</li>
          </ul>
        </div>
        <h1>Cart page</h1>
      </div>
      <table className="table table-striped cart-list">
			<thead>
				<tr>
					<th>
						Product
					</th>
					<th>
						Price
					</th>
					<th>
						Quantity
					</th>
					<th>
						Subtotal
					</th>
					<th>
						
					</th>
				</tr>
			</thead>
			<tbody>
        {
            cartItems.length === 0 ? 
            <h3>Your cart is empty</h3> : 
            cartItems.map(item => (
              <tr key={item.product}>
              <td>
                <div className="thumb_cart">
                  <img src={item.image} data-src={item.image} className="lazy" alt="" />
                </div>
                <Link to={`/${item.product}`}><span className="item_cart">{item.name}</span></Link>
              </td>
              <td>
                <strong>${item.price}</strong>
              </td>
              <td>
                {/* <div className="numbers-row">
                  <input type="text" value={item.qty} id="quantity_1" className="qty2" name="quantity_1" />
                <div className="inc button_inc">+</div><div className="dec button_inc">-</div></div> */}
                <div className="custom-select-form">
                    <select className="nice-select wide" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={ x + 1} value={x+1} >{x + 1}</option>
                        ))}
                    </select>
                </div>
              </td>
              <td>
                <strong>${item.price}</strong>
              </td>
              <td className="options">
                <button onClick={() => removeFromCartHandler(item.product)}><i className="ti-trash"></i></button>
              </td>
            </tr>

            )) 
        }
			</tbody>
		</table>
    
    </div>
    {/* // container */}

    <div className="box_cart">
			<div className="container">
			<div className="row justify-content-end">
				<div className="col-xl-4 col-lg-4 col-md-6">
			<ul>
				<li>
					<span>Subtotal</span> ({cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0)})
				</li>
				<li>
					<span>Shipping</span> $7.00
				</li>
				<li>
					<span>Total</span> ${cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0).toFixed(2)}
				</li>
			</ul>
			<button className="btn_1 full-width cart" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</button>
					</div>
				</div>
			</div>
		</div>
    </>
  )
}

export default CartScreen
