import logo from "../assets/bitcoin.avif"
import './nav.css'


const Home = () => {
  return (
    <div className='first-section'>
        <div className='coin-text'>
            <h3>BLOCK CHAIN WEBSITE</h3>
            <h3 className='text'>A PLATFORM WHERE <br />YOU CAN TRADE <br />  ALL COINS</h3>
        </div>
        <div>
        <img alt='' src={logo}/>
        </div>
    </div>
    
  )
}

export default Home