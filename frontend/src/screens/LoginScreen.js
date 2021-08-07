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
    <main class="bg_gray">
      <div class="container margin_30">
        <div class="page_header">
          <div class="breadcrumbs">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">User</Link></li>
              <li>Sign In</li>
            </ul>
        </div>
      </div>
      {/* <!-- /page_header --> */}
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-8">
          <h3>Sign In</h3>
          {error && <h4 style={{ color: 'red'}}>{error}</h4> }
          {loading && <Loader/> }
          <div class="box_account">
            <h3 class="client">Already Client</h3>
            <div class="form_container">
              <div class="row no-gutters">
                <div class="col-lg-6 pr-lg-1">
                  <a href="#0" class="social_bt facebook">Login with Facebook</a>
                </div>
                <div class="col-lg-6 pl-lg-1">
                  <a href="#0" class="social_bt google">Login with Google</a>
                </div>
              </div>
              <div class="divider"><span>Or</span></div>
              <form onSubmit={submitHandler}>
                <div class="form-group">
                  <input 
                    type="email" 
                    class="form-control" 
                    name="email" 
                    id="email" 
                    value={email}
                    placeholder="Email*"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input 
                    type="password" 
                    class="form-control" 
                    name="password_in" 
                    id="password_in" 
                    value={password} 
                    placeholder="Password*"
                    onChange={(e) => setPassword(e.target.value)}
                 />
                </div>
                <div class="clearfix add_bottom_15">
                  <div class="checkboxes float-left">
                    <label class="container_check">Remember me
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="float-right">
                    <Link to="/passwordReset" id="forgot">Lost Password?</Link>
                  </div>
                </div>
                <div class="text-center">
                  <input type="submit" value="Log In" class="btn_1 full-width" />
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
