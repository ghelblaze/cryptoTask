import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Trending.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

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
  const items = trending.map((coin, idx) => {
    return (
      <div key={idx} className="mx-5 ">
        <img src={coin.item.small} alt="coin_logo" />
        <br />
        <span>{coin.item.name}</span>
        <br />
        <span>{coin.item.symbol}</span>
        <br />
        <span>{(coin.item.price_btc * btcPrice).toFixed(9)} $</span>
        <br />
      </div>
    );
  });
  return (
    <div className=" bg-dark d-flex ">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay={true}
        autoPlayInterval={2000}
        disableButtonsControls
        responsive={{
          0: {
            items: 1,
          },
          1024: {
            items: 3,
            itemsFit: "contain",
          },
        }}
        items={items}
      />
    </div>
  );
};

export default Trending;
