import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({match, location, history}) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const {loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

  useEffect(() => {
    if(successUpdate){
      dispatch({type: USER_UPDATE_RESET})
      history.push('/admin/userlist')
    }else{
      if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
      }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }

    }
  }, [dispatch, user, userId, successUpdate, history])



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    
  }
  return (
    <main className="bg_gray">
      <div className="container margin_30">
        <div className="page_header">
          <div className="breadcrumbs">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">Admin</Link></li>
              <li>Edit </li>
            </ul>
            <Link to="/admin/userlist">Go back</Link>
        </div>
      </div>
      {/* <!-- /page_header --> */}
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-8">
          <h5>Edit User: {userId}</h5>
          { loadingUpdate && <Loader />}
          { errorUpdate && <p>{errorUpdate}</p>}
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
                  <label htmlFor="isadmin">Is Admin</label>
                  <input 
                    type="checkbox" 
                    className="form-control" 
                    name="isadmin" 
                    id="isadmin" 
                    label="Is Admin"
                    checked={isAdmin} 
                    onChange={(e) => setIsAdmin(e.target.checked)}
                 />
                </div>
                <div className="text-center">
                  <input type="submit" value="Update" className="btn_1 full-width" />
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

export default UserEditScreen
