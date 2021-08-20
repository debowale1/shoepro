import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, products, error } = productList

  const productDelete = useSelector(state => state.productDelete)
  const { loading:loadingDelete, success:successDelete, error:errorDelete } = productDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => { 
    if(userInfo && userInfo.isAdmin){
      dispatch(listProducts())
    }else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch, successDelete])

  
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')){
      dispatch(deleteProduct(id))
    }
  }
  const createProductHandler = (id) => {
    
      // dispatch(deleteUser(id))
    
  }


  return (
    <>
     <div className="container margin_30">
		<div className="page_header">
			<div className="breadcrumbs">
				<ul>
					<li><Link to="#">Home</Link></li>
					<li><Link to="#">Admin</Link></li>
					<li>Products</li>
				</ul>
			</div>
			<h1>Product List</h1>
      <div className="row">
        <div className="col-md-3">
          <button className="btn_1 full-width cart" onClick={createProductHandler}>CReate Product</button>
        </div>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <p style={{'color': 'red'}}>{errorDelete}</p>}
		</div>
    { loading ? <Loader /> : error ? <p>{error}</p> : (
      <table className="table table-striped cart-list">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Price
              </th>
              <th>
                Count In Stock
              </th>
              <th>
                Category
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.map(product => (
              <tr key={product._id}>
                <td>
                  <span className="">{product.name}</span>
                </td>
                <td>
                  <strong>{product.price}</strong>
                </td>
                <td>
                  <strong>{product.countInStock}</strong>
                </td>
                <td>
                  <strong>{product.category}</strong>
                </td>
                <td className="options">
                  <Link to={`/admin/product/${product._id}/edit`} className="btn_1 full-width cart">Edit</Link>
                  <button className="btn_1 full-width cart" onClick={() => deleteHandler(product._id)}>Delete</button>
                </td>
              </tr>

            ))}
            
          </tbody>
        </table>

    )}	
		</div> 
    </>
  )
}

export default ProductListScreen
