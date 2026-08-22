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
  const [loadError, setLoadError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasMoreCoins, setHasMoreCoins] = useState(true);
  const [retryKey, setRetryKey] = useState(0);
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
    const controller = new AbortController();

    setIsLoading(true);
    setLoadError(false);

    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}&per_page=${item_per_page}&page=${currentPage}&sparkline=false`,
          { signal: controller.signal },
        );

        if (!Array.isArray(response.data)) {
          throw new Error("The coin service returned an unexpected response.");
        }

        const coinResults = response.data.filter(
          (coin) => coin && typeof coin.id === "string",
        );

        setCoins((previousCoins) =>
          currentPage === 1
            ? coinResults
            : [...previousCoins, ...coinResults],
        );
        setHasMoreCoins(response.data.length === item_per_page);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Could not load coins.", error);
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setHasLoaded(true);
        }
      }
    };

    fetchCoins();

    return () => controller.abort();
  }, [currentPage, retryKey]);

  const retryLoadingCoins = () => {
    setRetryKey((key) => key + 1);
  };

  const columnCount = isMobile ? 4 : 6;

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
          {isLoading && coins.length === 0 && (
            <tr>
              <td colSpan={columnCount}>Loading authorized coins...</td>
            </tr>
          )}
          {loadError && coins.length === 0 && (
            <tr>
              <td colSpan={columnCount}>
                <p>We could not load the authorized coins. Please try again.</p>
                <button type="button" onClick={retryLoadingCoins}>
                  Try again
                </button>
              </td>
            </tr>
          )}
          {hasLoaded && !isLoading && !loadError && coins.length === 0 && (
            <tr>
              <td colSpan={columnCount}>No authorized coins are available.</td>
            </tr>
          )}
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
      {coins.length > 0 &&
        !loadError &&
        hasMoreCoins &&
        currentPage < no_of_pages && (
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
      {loadError && coins.length > 0 && (
        <div
          role="alert"
          style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}
        >
          <span>More coins could not be loaded.</span>
          <button type="button" onClick={retryLoadingCoins}>
            Try again
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
