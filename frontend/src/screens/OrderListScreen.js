import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({history}) => {
  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, orders, error } = orderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listOrders())
    }else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch])

  return (
    <>
     <div className="container margin_30">
		<div className="page_header">
			<div className="breadcrumbs">
				<ul>
					<li><Link to="#">Home</Link></li>
					<li><Link to="#">Category</Link></li>
					<li>Orders</li>
				</ul>
			</div>
			<h1>Orders List</h1>

		</div>
    { loading ? <Loader /> : error ? <p>{error}</p> : (
      <table className="table table-striped cart-list">
          <thead>
            <tr>
              <th>
                ID
              </th>
              <th>
                USER
              </th>
              <th>
                DATE
              </th>
              <th>
                TOTAL
              </th>
              <th>
                PAID
              </th>
              <th>
                DELIVERED
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(order => (
              <tr key={order._id}>
                <td>
                  <span className="">{order.user.id}</span>
                </td>
                <td>
                  <span className="">{order.user.name}</span>
                </td>
                <td>
                  <strong>{order.createdAt}</strong>
                </td>
                <td>
                  <strong>${order.totalPrice}</strong>
                </td>
                <td>
                  {order.isPaid ? <strong>Yes</strong> : <strong>No</strong>}
                </td>
                <td>
                {order.isDelivered ? <strong>Yes</strong> : <strong>No</strong>}
                  {/* <strong>{order.isDelivered}</strong> */}
                </td>
                <td className="options">
                  <Link to={`/order/${order._id}`} className="btn_1 full-width cart">Details</Link>
                  {/* <button className="btn_1 full-width cart" onClick={() => deleteHandler(user._id)}>Delete</button> */}
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

export default OrderListScreen
