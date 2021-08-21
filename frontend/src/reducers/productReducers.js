import * as productConstants from '../constants/productConstants'


export const productListReducer = (state = {products: []}, action ) => {
  switch(action.type){
    case productConstants.PRODUCT_LIST_REQUEST: 
      return {
        loading: true,
        products: []
      }
    case productConstants.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case productConstants.PRODUCT_LIST_FAIL:
      return {
        laoding: false,
        error: action.payload
      }
    default:
      return state
  }
}
export const productDetailsReducer = (state = { product: { reviews: [] } }, action ) => {
  switch(action.type){
    case productConstants.PRODUCT_DETAILS_REQUEST: 
      return {
        loading: true,
        ...state
      }
    case productConstants.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case productConstants.PRODUCT_DETAILS_FAIL:
      return {
        laoding: false,
        error: action.payload
      }
    default:
      return state
  }
}
export const productDeleteReducer = (state = { }, action ) => {
  switch(action.type){
    case productConstants.PRODUCT_DELETE_REQUEST: 
      return {
        loading: true,
      }
    case productConstants.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case productConstants.PRODUCT_DELETE_FAIL:
      return {
        laoding: false,
        error: action.payload
      }
    default:
      return state
  }
}
export const productCreateReducer = (state = {}, action ) => {
  switch(action.type){
    case productConstants.PRODUCT_CREATE_REQUEST: 
      return {
        loading: true,
      }
    case productConstants.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        prdouct: action.payload
      }
    case productConstants.PRODUCT_CREATE_FAIL:
      return {
        laoding: false,
        success: true,
        error: action.payload
      }
    case productConstants.PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

