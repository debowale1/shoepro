import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
// import Banner from './components/Banner'
import {BrowserRouter as Router, Route} from 'react-router-dom'
const App = () => {
  return (
    <Router>
    <div id="page">
      <Header />
      <main>
        <Route path='/' exact component={HomeScreen}/>
        <Route path='/product/:id' component={ProductScreen}/>
        <Route path='/cart/:id?' component={CartScreen}/>
      </main>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
