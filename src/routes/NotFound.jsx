import { Link } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa6";

const NotFound = () => {
  return (
    <div className="not-found">
      <FaBitcoin size={100} className="coin-text"/>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="home-link">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;