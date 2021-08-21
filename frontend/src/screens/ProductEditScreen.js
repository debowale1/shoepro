import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
// import { USER_UPDATE_RESET } from '../constants/userConstants'

const ProductEditScreen = ({match, location, history}) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product } = productDetails

  useEffect(() => {
    
      if(!product.name || product._id !== productId){
        dispatch(listProductDetails(productId))
      }else{
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCountInStock(product.countInStock)
        setCategory(product.category)
        setDescription(product.description)
      }
  }, [dispatch, product, productId, history])



  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    
  }
  return (
    <main className="bg_gray">
      <div className="container margin_30">
        <div className="page_header">
          <div className="breadcrumbs">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">Admin</Link></li>
              <li>Edit Product</li>
            </ul>
            <Link to="/admin/productlist">Go back</Link>
        </div>
      </div>
      {/* <!-- /page_header --> */}
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-8">
          <h5>Edit Product: {productId}</h5>
          {/* { loadingUpdate && <Loader />}
          { errorUpdate && <p>{errorUpdate}</p>} */}
          <div className="box_account">
            {/* <h3 className="client">Already Client</h3> */}
            <div className="form_container">
              {loading ? <Loader /> : error ? <p className="error">{error}</p> : (
                <form onSubmit={submitHandler}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    id="name" 
                    value={name}
                    placeholder="Name*"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="number" 
                    className="form-control" 
                    name="price" 
                    id="price" 
                    value={price}
                    placeholder="Price*"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="category" 
                    id="category" 
                    value={category}
                    placeholder="Category*"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="brand" 
                    id="brand" 
                    value={brand}
                    placeholder="Brand*"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="countInStock" 
                    id="countInStock" 
                    value={countInStock}
                    placeholder="Count In Stock*"
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="description" 
                    id="description" 
                    value={description}
                    placeholder="Description*"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="image" 
                    id="image" 
                    value={image}
                    placeholder="Image*"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                
                <div className="text-center">
                  <input type="submit" value="Update Product" className="btn_1 full-width" />
                </div>
              </form>
              ) }
              
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

export default ProductEditScreen
