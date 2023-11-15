import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Trending.css";
import millify from "millify";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [btcPrice, setBtcPrice] = useState(0);
  const fetchTrending = async () => {
    await axios
      .get(`https://api.coingecko.com/api/v3/search/trending`)
      .then((res) => {
        setTrending(res.data.coins);
      });
  };
  const fetchBTCprice = async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
      )
      .then((res) => {
        setBtcPrice(res.data.bitcoin.usd);
        console.log(res.data.bitcoin.usd);
      });
  };
  useEffect(() => {
    fetchTrending();
    fetchBTCprice();
  }, []);
  return (
    <div className="trending_container">
      {console.log(trending)}
      {trending.map((coin, idx) => {
        return (
          <div key={idx}>
            <img src={coin.item.small} alt="coin_logo" />
            <br />
            <span>{coin.item.name}</span>
            <br />
            <span>{coin.item.symbol}</span>
            <br />
            <span>{(coin.item.price_btc * btcPrice).toFixed(2)} $</span>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Trending;
