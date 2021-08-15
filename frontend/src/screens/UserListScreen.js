import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
// import { USER_LIST_RESET } from '../constants/userConstants'

const UserListScreen = ({history}) => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, users, error } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const userDelete = useSelector(state => state.userDelete)
  const { success:successDelete } = userDelete

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers())
    }else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch, successDelete])

  const editHandler = (id) => {}
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')){
      dispatch(deleteUser(id))
    }
  }

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
            {users && users.map(user => (
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
		</div> 
    </>
  )
}

export default UserListScreen
