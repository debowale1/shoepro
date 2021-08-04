import axios from 'axios'
import * as productConstants from '../constants/productConstants'

export const productLists = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_LIST_REQUEST})

    const res = await axios.get('/api/v1/products')
    // const {data} = res.data;
    dispatch({
      type: productConstants.PRODUCT_LIST_SUCCESS,
      payload: res.data.data})
  } catch (error) {
    dispatch({ 
      type: productConstants.PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}