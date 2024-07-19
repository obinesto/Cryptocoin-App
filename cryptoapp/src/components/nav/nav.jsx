import './nav.css'
import { FaBitcoin } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const nav = () => {
  return (
    <>
    <div className="nav-section">
      <div className='coins'>
      <FaBitcoin size={30}/>
      <h1 className='coin-text'>Coins</h1>
      </div>

      <div className='about'>
        <span>About!</span>
        <FaArrowRight/>
      </div>

      <div className='auth'>
        <span>Auth Coin</span>
        <FaArrowRight/>
      </div>

      <div className='ham'>
        <GiHamburgerMenu size={30}/>
      </div>
    </div>
    </>
  )
}

export default nav