import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'

const UserListScreen = () => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, users, error } = userList

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  const editHandler = (id) => {}
  const deleteHandler = (id) => {}

  return (
    <>
     <div className="container margin_30">
		<div className="page_header">
			<div className="breadcrumbs">
				<ul>
					<li><Link to="#">Home</Link></li>
					<li><Link to="#">Category</Link></li>
					<li>Page active</li>
				</ul>
			</div>
			<h1>Users List</h1>

		</div>
    { loading ? <Loader /> : error ? <p>{error}</p> : (
      <table className="table table-striped cart-list">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Email
              </th>
              <th>
                Role
              </th>
              <th>
                Join At
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <span className="">{user.name}</span>
                </td>
                <td>
                  <strong>{user.email}</strong>
                </td>
                <td>
                  <strong>{user.role}</strong>
                </td>
                <td>
                  <strong>$140.00</strong>
                </td>
                <td className="options">
                  <button className="btn_1 full-width cart" onClick={() => editHandler(user._id)}>Edit</button>
                  <button className="btn_1 full-width cart" onClick={() => deleteHandler(user._id)}>Delete</button>
                </td>
              </tr>

            ))}
            
          </tbody>
        </table>

    )}

      {/* <div class="row add_top_30 flex-sm-row-reverse cart_actions">
      <div class="col-sm-4 text-right">
        <button type="button" class="btn_1 gray">Update Cart</button>
      </div>
        <div class="col-sm-8">
        <div class="apply-coupon">
          <div class="form-group form-inline">
            <input type="text" name="coupon-code" value="" placeholder="Promo code" class="form-control"/><button type="button" class="btn_1 outline">Apply Coupon</button>
          </div>
        </div>
      </div>
    </div> */}
					{/* <!-- /cart_actions --> */}
	
		</div> 
    </>
  )
}

export default UserListScreen
