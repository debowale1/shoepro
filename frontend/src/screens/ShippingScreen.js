import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ShippingScreen = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  // const [address, setAddress] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    //DISPATCH EVENT
  }
  return (
    <main class="bg_gray">
      <div class="container margin_30">
        <div class="page_header">
          <div class="breadcrumbs">
            <ul>
              <li><Link to="#">Home</Link></li>
              <li><Link to="#">User</Link></li>
              <li>Checkout Information</li>
            </ul>
        </div>
      </div>
      {/* <!-- /page_header --> */}
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-8">
          <h5>Shipping Info</h5>
          {/* {error && <h6 style={{ color: 'red'}}>{error}</h6> }
          {loading && <Loader/> } */}
          <div class="box_account">

            <div class="form_container">
              <form onSubmit={submitHandler}>
                <div class="form-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    name="address" 
                    id="address" 
                    value={address}
                    placeholder="Address*"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    name="city" 
                    id="city" 
                    value={city}
                    placeholder="City*"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    name="postalCode" 
                    id="postalCode" 
                    value={postalCode} 
                    placeholder="Postal Code*"
                    onChange={(e) => setPostalCode(e.target.value)}
                 />
                </div>
                <div class="form-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    name="country" 
                    id="country" 
                    value={country} 
                    placeholder="Country*"
                    onChange={(e) => setCountry(e.target.value)}
                 />
                </div>
                <div class="text-center">
                  <input type="submit" value="Continue" class="btn_1 full-width" />
                </div>
              </form>
              
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

export default ShippingScreen
