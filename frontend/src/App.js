import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UserListScreen from './screens/UserListScreen'
import ProductListScreen from './screens/ProductListScreen'
import UserEditScreen from './screens/UserEditScreen'

const App = () => {
  return (
    <Router>
    <div id="page">
      <Header />
      <main>
        <Route path='/order/:id' component={OrderScreen}/>
        <Route path='/shipping' component={ShippingScreen}/>
        <Route path='/placeorder' component={PlaceOrderScreen}/>
        <Route path='/payment' component={PaymentScreen}/>
        <Route path='/login' component={LoginScreen}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/admin/userlist' component={UserListScreen}/>
        <Route path='/admin/productlist' component={ProductListScreen}/>
        <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
        <Route path='/profile' component={ProfileScreen}/>
        <Route path='/product/:id' component={ProductScreen}/>
        <Route path='/cart/:id?' component={CartScreen}/>
        <Route path='/' exact component={HomeScreen}/>
      </main>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
