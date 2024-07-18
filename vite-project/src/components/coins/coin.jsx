import './coin.css'
// import axios from 'axios'

const coin = () => {
    // axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false")
  return (
    <>
    <div className="coin-header">
        <h2>Authoried coins with current rate</h2>
    </div>

    <ul className='list-container'>
        <li>#</li>
        <li>Coin</li>
        <li>Price</li>
        <li>24h</li>
        <li>Volume</li>
        <li>Mrkt Cap</li>
    </ul>
    </>
  )
}

export default coin