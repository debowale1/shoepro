import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'

//combine our reducers
const reducers = combineReducers({
  productList: productListReducer 
})

const initialState = {}

const middleware = [thunk]


//create store
const store = createStore(
  reducers, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store