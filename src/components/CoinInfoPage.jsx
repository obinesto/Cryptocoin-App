import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegArrowAltCircleLeft, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { usePwa } from "./PwaProvider";

const CoinInfoPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoinData = async () => {
      setLoading(true);
      setLoadError(false);

      try {
        const response = await axios.get(apiUrl, { signal: controller.signal });

        if (!Array.isArray(response.data)) {
          throw new Error("The coin service returned an unexpected response.");
        }

        setCoinData(response.data.find((coin) => coin.id === id) ?? null);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Could not load coin details.", error);
          setCoinData(null);
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCoinData();

    return () => controller.abort();
  }, [id, apiUrl, retryKey]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { deferredPrompt, installPwa } = usePwa();

  if (loading) return <div className="loading">Loading...</div>;
  if (loadError) {
    return (
      <div className="error">
        <p>We could not load this coin. Please try again.</p>
        <button type="button" onClick={() => setRetryKey((key) => key + 1)}>
          Try again
        </button>
        <Link to="/" className="home-link">
          Return home
        </Link>
      </div>
    );
  }
  if (!coinData) return <div className="error">Coin not found</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatNumber = (num) => {
    if (!Number.isFinite(num)) return "—";

    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatPercentage = (percentage) => {
    return Number.isFinite(percentage) ? `${percentage.toFixed(2)}%` : "—";
  };

  return (
    <div className="coin-info-container">
      <Link to="/" title="back to home page" className="back-home">
        <FaRegArrowAltCircleLeft color="white" />
      </Link>
      <div className="coin-info-header">
        <img src={coinData.image} alt={`${coinData.name} logo`} />
        <div>
          <h1>
            {coinData.name} ({coinData.symbol?.toUpperCase() ?? "—"})
          </h1>
          <p>Rank #{coinData.market_cap_rank}</p>
        </div>
      </div>

      <div className="coin-info-grid">
        <div className="info-card">
          <h3>Price Statistics</h3>
          <div className="info-item">
            <span>Current Price:</span>
            <span>${formatNumber(coinData.current_price)}</span>
          </div>
          <div className="info-item">
            <span>24h High:</span>
            <span>${formatNumber(coinData.high_24h)}</span>
          </div>
          <div className="info-item">
            <span>24h Low:</span>
            <span>${formatNumber(coinData.low_24h)}</span>
          </div>
          <div className="info-item">
            <span>24h Change:</span>
            <span
              className={
                coinData.price_change_percentage_24h > 0
                  ? "positive"
                  : "negative"
              }
            >
              {formatPercentage(coinData.price_change_percentage_24h)}
            </span>
          </div>
        </div>

        <div className="info-card">
          <h3>Market Statistics</h3>
          <div className="info-item">
            <span>Market Cap:</span>
            <span>${formatNumber(coinData.market_cap)}</span>
          </div>
          <div className="info-item">
            <span>24h Volume:</span>
            <span>${formatNumber(coinData.total_volume)}</span>
          </div>
          <div className="info-item">
            <span>Circulating Supply:</span>
            <span>
              {formatNumber(coinData.circulating_supply)}{" "}
              {coinData.symbol?.toUpperCase() ?? "—"}
            </span>
          </div>
          <div className="info-item">
            <span>Total Supply:</span>
            <span>
              {formatNumber(coinData.total_supply)}{" "}
              {coinData.symbol?.toUpperCase() ?? "—"}
            </span>
          </div>
        </div>

        <div className="info-card">
          <h3>All-Time Statistics</h3>
          <div className="info-item">
            <span>All-Time High:</span>
            <span>${formatNumber(coinData.ath)}</span>
          </div>
          <div className="info-item">
            <span>ATH Date:</span>
            <span>{formatDate(coinData.ath_date)}</span>
          </div>
          <div className="info-item">
            <span>All-Time Low:</span>
            <span>${formatNumber(coinData.atl)}</span>
          </div>
          <div className="info-item">
            <span>ATL Date:</span>
            <span>{formatDate(coinData.atl_date)}</span>
          </div>
        </div>

        <div className="info-card">
          <h3>Additional Information</h3>
          <div className="info-item">
            <span>Last Updated:</span>
            <span>{formatDate(coinData.last_updated)}</span>
          </div>
          <div className="info-item">
            <span>Market Cap Change 24h:</span>
            <span
              className={
                coinData.market_cap_change_percentage_24h > 0
                  ? "positive"
                  : "negative"
              }
            >
              {formatPercentage(coinData.market_cap_change_percentage_24h)}
            </span>
          </div>
        </div>
      </div>

      {isMobile && deferredPrompt && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <button
            type="button"
            title="install button"
            onClick={installPwa}
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              height: "30px",
              backgroundColor: "#2b2b2b",
              color: "white",
              borderRadius: "4px",
              borderWidth: "0px",
              cursor: "pointer",
            }}
          >
            <span>Install for easy access</span>
            <FaArrowDown color="orangered" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CoinInfoPage;
