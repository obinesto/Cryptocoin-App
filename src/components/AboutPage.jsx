const AboutPage = () => {
  return (
    <div className="about-section">
      <h1>About Crypto Coins</h1>
      <div className="about-content">
        <p>Welcome to our Cryptocurrency Information Platform!</p>
        <p>This application provides real-time information about various cryptocurrencies,
          including their current prices, market caps, and 24-hour price changes.</p>
        <p>Our platform uses the latest blockchain data to ensure you have access to
          accurate and up-to-date information about your favorite cryptocurrencies.</p>
        <div className="features">
          <h2>Key Features:</h2>
          <ul>
            <li>Real-time cryptocurrency prices</li>
            <li>24-hour price change tracking</li>
            <li>Market cap information</li>
            <li>Detailed coin information</li>
            <li>User-friendly interface</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;