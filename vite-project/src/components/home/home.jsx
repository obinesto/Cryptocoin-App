import logo from "../../assets/pexels-jonathanborba-14354113.jpg"
import './home.css'


const Home = () => {
  return (
    <div className='first-section'>
        <div className='coin-text'>
            <h3>BLOCK CHAIN WEBSITE</h3>
            <h3 className='text'>A PLATFORM WHERE <br />YOU CAN TRADE <br />  ALL COINS</h3>
        </div>
        <div className="img-container">
        <img alt='' src={logo}/>
        </div>
    </div>
    
  )
}

export default Home