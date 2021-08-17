import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

const UserEditScreen = ({match, location, history}) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user } = userDetails

  useEffect(() => {
    if(!user.name || user._id !== userId){
      dispatch(getUserDetails(userId))
    }else{
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, user, userId])



  const submitHandler = (e) => {
    e.preventDefault()
    
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
                {/* <div className="checkboxes float-left">
                    <label className="container_check">Is Admin
                      <input 
                        type="checkbox"
                        checked={isAdmin} 
                        onChange={(e) => setIsAdmin(e.target.checked)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div> */}
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
