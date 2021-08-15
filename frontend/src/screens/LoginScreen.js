import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Loader from './../components/Loader'
import { login } from './../actions/userActions'

const LoginScreen = ({location, history}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo } = userLogin

  let redirect = location.search ? location.search.split('=')[1] : '/'
  redirect = ''

  useEffect(() => {
    if(redirect){
      history.push(redirect)
    }
 
  }, [history, redirect, userInfo])



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <main className="bg_gray">
      <div className="container margin_30">
        <div className="page_header">
          <div className="breadcrumbs">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">User</Link></li>
              <li>Sign In</li>
            </ul>
        </div>
      </div>
      {/* <!-- /page_header --> */}
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-8">
          <h3>Sign In</h3>
          {error && <h4 style={{ color: 'red'}}>{error}</h4> }
          {loading && <Loader/> }
          <div className="box_account">
            <h3 className="client">Already Client</h3>
            <div className="form_container">
              <div className="row no-gutters">
                <div className="col-lg-6 pr-lg-1">
                  <a href="#0" className="social_bt facebook">Login with Facebook</a>
                </div>
                <div className="col-lg-6 pl-lg-1">
                  <a href="#0" className="social_bt google">Login with Google</a>
                </div>
              </div>
              <div className="divider"><span>Or</span></div>
              <form onSubmit={submitHandler}>
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
                <div className="clearfix add_bottom_15">
                  <div className="checkboxes float-left">
                    <label className="container_check">Remember me
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="float-right">
                    <Link to="/passwordReset" id="forgot">Lost Password?</Link>
                  </div>
                </div>
                <div className="text-center">
                  <input type="submit" value="Log In" className="btn_1 full-width" />
                </div>
              </form>
              <p>New User? <Link to={redirect ? `/register?redirect=${redirect}` : '/register' }>Register </Link></p>
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

export default LoginScreen
