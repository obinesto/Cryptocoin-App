import { useEffect, useState } from "react";
import './coinitems.css';
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const CoinItems = () => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        axios.get(apiUrl).then((res) => {
            console.log(res.data);
            setCoins(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            {coins.map((data, index) => (
                <div key={data.id} className="coins-container">
                    <div>{index + 1}</div>
                    <div className="coins-img-container">{data.id}<img src={data.image}alt={`${data.id} logo`}></img></div>
                    <div>{data.current_price}</div>
                    <div>{data.price_change_percentage_24h}</div>
                    <div>{data.total_volume}</div>
                    <div>{data.market_cap}</div>
                </div>
            ))}
        </div>
    );
}

export default CoinItems;
