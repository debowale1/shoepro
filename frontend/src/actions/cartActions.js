import axios from 'axios'
import * as cartConstants from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const res = await axios.get(`/api/v1/products/${id}`)
    const {product} = res.data.data

    dispatch({ 
      type: cartConstants.CART_ADD_ITEM,
      payload: {
        product:  product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty
      }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}