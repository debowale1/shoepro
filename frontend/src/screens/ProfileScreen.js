import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'


const ProfileScreen = ({history}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user } = userDetails

  //get logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  const { loading:loadingOrders, orders, error:errorOrders} = orderListMy

  // let redirect = location.search ? location.search.split('=')[1] : '/'
  // redirect = ''

  useEffect(() => {
    if(!userInfo){
      history.push('/login')
    }else{
      if(!user.name){
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      }else{
        setName(user.name)
        setEmail(user.email)
      }
    }
 
  }, [dispatch, history, userInfo, user ])



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile({id: user._id, name, email}))
  }
  return (
    <main className="bg_gray">
      <div className="container margin_30">
        <div className="page_header">
          <div className="breadcrumbs">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">User</Link></li>
              <li>Update Profile</li>
            </ul>
        </div>
      </div>
      {/* <!-- /page_header --> */}
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-8">
          <h5>User Profile</h5>
          {error && <h6 style={{ color: 'red'}}>{error}</h6> }
          {success && <h6 style={{ color: 'green'}}>Updated Successfully</h6> }
          {loading && <Loader/> }
          <div className="box_account">
            {/* <h3 className="client">Already Client</h3> */}
            <div className="form_container">
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
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email" 
                    value={email}
                    placeholder="Email*"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password_in" 
                    id="password_in" 
                    value={password} 
                    placeholder="Password*"
                    onChange={(e) => setPassword(e.target.value)}
                 />
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control" 
                    name="passwordConfirm" 
                    id="passwordConfirm" 
                    value={passwordConfirm} 
                    placeholder="Confirm Password*"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                 />
                </div>
                <div className="text-center">
                  <input type="submit" value="Update Profile" className="btn_1 full-width" />
                </div>
              </form>
            </div>
            {/* <!-- /form_container --> */}
          </div>
          {/* <!-- /box_account --> */}
        </div>

      </div>
      {/* <!-- /row --> */}
      {loadingOrders ? <Loader /> : errorOrders ? <p>{error}</p> : (
        <table class="table table-striped cart-list">
        <thead>
          <tr>
            <th>
              ID
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
              
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>
                <span class="item_cart">{order._id}</span>
              </td>
              <td>
                <strong>{new Date(order.paidAt).toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric'})}</strong>
              </td>
              <td>
                <div>
                 ${order.totalPrice}
                </div>
              </td>
              <td>
                <div>
                 {order.isPaid ? 'Yes' : 'No'}
                </div>
              </td>
              <td>
                <strong>{order.isDelivered ? 'Yes' : 'No'}</strong>
              </td>
            </tr>
          ))}

         
        </tbody>
      </table>
      ) }
      </div>
        {/* <!-- /container --> */}
    </main>
	
  )
}

export default ProfileScreen
