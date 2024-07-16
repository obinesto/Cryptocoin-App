import { FaBitcoin } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import './nav.css'

const Nav = () => {
  return (
    <div>
     <nav className="navSection">

        <div className='bit-icon'>
            <FaBitcoin color='white' size={30}/>
            <h2 className='coin'>Coins</h2>
        </div>

        <div className='about'>
            <p>About</p>
            <FaArrowRight />
        </div>

        <div className='push-coin'>
            <p>Auth coin</p>
            <FaArrowRight />
        </div>
                <IoMdClose className='close' />
                <RxHamburgerMenu className='ham' />
            
        </nav>
    </div>
  )
}

export default Nav