import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "../../public/assets/pexels-jonathanborba-14354113.jpg";

const apiUrl = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then(async (res) => {
        const data = await res.data;
        setCoins(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="home-section">
        <div className="home-content">
          <h1>CRYPTOCOIN APP</h1>
          <span>A PLATFORM WHERE</span>
          <br />
          <span>
            YOU <br />
            CAN VIEW INFORMATION ABOUT <br />
            AUTHORIZED COINS
          </span>
        </div>
        <div className="home-img">
          <img src={Image} alt="" />
        </div>
      </div>
      <div className="coin-header">
        <h2>Authoried coins with current information</h2>
      </div>

      <ul className="list-container">
        <li>#</li>
        <li>Coin</li>
        <li>Price</li>
        {!isMobile && (
          <>
            <li>24h</li>
            <li>Volume</li>
          </>
        )}
        <li>Mrkt Cap</li>
      </ul>
      <div>
        {coins.map((data, index) => (
          <div key={data.id} className="coins-container" id="auth-coins">
            <div>{index + 1}</div>
            <Link
              className="coins-img-container"
              to={`/coin/${data.id}`}
              title={`View details for ${data.id}`}
            >
              <p>{truncateText(data.id, 10)}</p>
              <img src={data.image} alt={`${data.id} logo`}></img>
            </Link>
            <div>{data.current_price}</div>
            <div style={{ display: isMobile ? "none" : "block" }}>
              {data.price_change_percentage_24h}
            </div>
            <div style={{ display: isMobile ? "none" : "block" }}>
              {data.total_volume}
            </div>
            <div>{data.market_cap}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
