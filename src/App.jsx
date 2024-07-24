import Home from './components/home/home.jsx';
import Nav from './components/nav/nav.jsx';
import Coins from './components/rendercoins/coins.jsx';
import CoinItems from './components/coinItems/coinitems.jsx'
import './App.css'

function App() {
  return (
    <>
      <Nav />
      <Home />
      <Coins />
      <CoinItems/>
    </>
  );
}

export default App;
