import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import axios from "axios";
import Image from "/assets/pexels-jonathanborba.jpg";

const item_per_page = 20;
const no_of_pages = 10;
const apiUrl = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    axios
      .get(
        `${apiUrl}&per_page=${item_per_page}&page=${currentPage}&sparkline=false`
      )
      .then(async (res) => {
        const data = await res.data;
        if (currentPage === 1) {
          setCoins(data);
        } else {
          setCoins((prevCoins) => [...prevCoins, ...data]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [currentPage]);

  return (
    <>
      <div className="home-section-one">
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

      {/* coin display section */}
      <div className="coin-header">
        <h2>Authoried coins with current information</h2>
      </div>
      <table className="coin-display-table">
        <thead className="coin-display-table-head">
          <tr className="coin-display-table-row">
            <th>#</th>
            <th>Coin</th>
            <th>$Price</th>
            <th>24h%</th>
            {!isMobile && (
              <>
                <th>$Volume</th>
                <th>$Mrkt Cap</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {coins.map((data, index) => (
            <tr
              key={data.id}
              className="coins-display-tbody-tr"
              id="auth-coins"
            >
              <td>{index + 1}</td>
              <td>
                <Link
                  className="coins-img-container"
                  to={`/coin/${data.id}`}
                  title={`View details for ${data.id}`}
                >
                  <img src={data.image} alt={`${data.id} logo`} />
                  <p>{truncateText(data.id, 10)}</p>
                </Link>
              </td>
              <td>${data.current_price}</td>
              <td style={{ display: "flex", alignItems: "center" }}>
                {data.price_change_percentage_24h > 0 ? (
                  <BiSolidUpArrow color="green" />
                ) : (
                  <BiSolidDownArrow color="red" />
                )}
                {data.price_change_percentage_24h}%
              </td>
              {!isMobile && (
                <>
                  <td>${data.total_volume}</td>
                  <td>${data.market_cap}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {currentPage < no_of_pages && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: ".5rem",
          }}
        >
          <button
            type="button"
            title="load more coins"
            disabled={isLoading}
            onClick={() => {
              setCurrentPage((current) => current + 1);
            }}
            style={{
              height: "30px",
              backgroundColor: "#2b2b2b",
              color: "white",
              borderRadius: "4px",
              borderWidth: "0px",
              cursor: "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading && currentPage > 1 ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
