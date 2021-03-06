import axios from 'axios'
import * as productConstants from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_LIST_REQUEST})

    const res = await axios.get('/api/v1/products')
    // const {data} = res.data;
    dispatch({
      type: productConstants.PRODUCT_LIST_SUCCESS,
      payload: res.data.data.products})
  } catch (error) {
    dispatch({ 
      type: productConstants.PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_DETAILS_REQUEST})

    const res = await axios.get(`/api/v1/products/${id}`)
    // const {data} = res.data;
    dispatch({
      type: productConstants.PRODUCT_DETAILS_SUCCESS,
      payload: res.data.data.product})
  } catch (error) {
    dispatch({ 
      type: productConstants.PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: productConstants.PRODUCT_DELETE_REQUEST
    })

    const {userLogin: {userInfo} } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/v1/products/${id}`, config)
    // const {data} = res.data;
    dispatch({
      type: productConstants.PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({ 
      type: productConstants.PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: productConstants.PRODUCT_CREATE_REQUEST
    })

    const {userLogin: {userInfo} } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.post(`/api/v1/products/`, {}, config)
    
    dispatch({
      type: productConstants.PRODUCT_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({ 
      type: productConstants.PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: productConstants.PRODUCT_UPDATE_REQUEST
    })

    const {userLogin: {userInfo} } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put(`/api/v1/products/${product._id}`, product, config)
    
    dispatch({
      type: productConstants.PRODUCT_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({ 
      type: productConstants.PRODUCT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}