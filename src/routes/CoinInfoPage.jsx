import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";

const CoinInfoPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const coinData = response.data.find((coin) => coin.id === id);
        setCoinData(coinData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id, apiUrl]);

  if (loading) return <div className="loading">Loading...</div>;
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
    return new Intl.NumberFormat("en-US").format(num);
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
            {coinData.name} ({coinData.symbol.toUpperCase()})
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
              {coinData.price_change_percentage_24h.toFixed(2)}%
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
              {coinData.symbol.toUpperCase()}
            </span>
          </div>
          <div className="info-item">
            <span>Total Supply:</span>
            <span>
              {formatNumber(coinData.total_supply)}{" "}
              {coinData.symbol.toUpperCase()}
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
              {coinData.market_cap_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInfoPage;
