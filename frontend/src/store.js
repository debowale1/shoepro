import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'

//combine our reducers
const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

//all initial states go here
const initialState = {
  cart: {cartItems: cartItemsFromStorage},
  userLogin: { userInfo: userInfoFromStorage}
}

const middleware = [thunk]


//create store
const store = createStore(
  reducers, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store