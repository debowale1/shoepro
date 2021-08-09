import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
  return (
    <Router>
    <div id="page">
      <Header />
      <main>
        <Route path='/shipping' component={ShippingScreen}/>
        <Route path='/login' component={LoginScreen}/>
        <Route path='/register' component={RegisterScreen}/>
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
