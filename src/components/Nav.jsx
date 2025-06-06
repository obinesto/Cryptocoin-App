import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowRight, FaBitcoin } from "react-icons/fa";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";

const Nav = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  
  return (
    <>{/* non-mobile Navigation Section */}
      <div className="non-mobile-nav-section">
        <Link to="/" className="coin-logo">
            <FaBitcoin size={30} className="coin-text"/>
            <h1>Coins</h1>
        </Link>

        <Link to="/about" className="about">
            <h1>About</h1>
            <FaArrowRight />
        </Link>

        <a href="/#auth-coins" className="auth">
            <h1>Auth Coins</h1>
            <FaArrowRight />
        </a>

        <div>
          <GiHamburgerMenu size={30} color="orangered" />
        </div>
      </div>
      {/* mobile Navigation Section */}
      <div className="mobile-nav-section">
        <Link to="/" className="coin-logo">
            <FaBitcoin size={30} className="coin-text"/>
            <h1>Coins</h1>
        </Link>

        <button
          onClick={toggleSideBar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
          style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
        >
          <GiHamburgerMenu size={30} color="orangered" display={isSideBarOpen ? 'none' : 'block'} />
          <GiCancel size={30} color="orangered" display={isSideBarOpen ? 'block' : 'none'} />
        </button>
      </div>
      {isSideBarOpen && (
        <div className="sidebar">
          <Link to="/about" className="about">
            <h1>About</h1>
            <FaArrowRight />
          </Link>

          <a href="/#auth-coins" className="auth">
            <h1>Auth Coins</h1>
            <FaArrowRight />
          </a>
        </div>
      )}
    </>
  );
};

export default Nav;