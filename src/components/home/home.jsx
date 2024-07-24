import "./home.css";
import Image from "../../assets/pexels-jonathanborba-14354113.jpg";

const home = () => {
  return (
    <>
      <div className="home-section">
        <div className="home-content">
          <h1>
            BLOCK CHAIN WEBSITE <br />
            <span>
              A PLATFORM WHERE <br /> YOU CAN TRADE <br /> ALL COINS
            </span>
          </h1>
        </div>
        <div className="home-img">
          <img src={Image} alt="" />
        </div>
      </div>
    </>
  );
};

export default home;
