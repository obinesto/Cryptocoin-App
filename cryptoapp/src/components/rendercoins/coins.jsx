import './coins.css'

const coins = () => {
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

export default coins