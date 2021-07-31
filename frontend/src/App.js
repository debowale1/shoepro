
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Banner from './components/Banner'
const App = () => {
  return (
    <div id="page">
      <Header />
      <main>
        <HomeScreen/>
        {/* <Banner /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
