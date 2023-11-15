import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCoin = async () => {
    await axios
      .get("https://api.coingecko.com/api/v3/coins/" + id)
      .then((res) => {
        setCoin(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div>
      <div className="aside">
        <div>
          <img src={coin.image.small} alt="coin_logo" />
          <p>{coin.name}</p>
          <p>Description:</p>
          <p dangerouslySetInnerHTML={{ __html: coin.description.en }} />
        </div>
        <dl>
          <dt>Market Rank</dt>
          <dd>{coin.name}</dd>
        </dl>
        <dl>
          <dt>Market Cap</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>Volume 24H</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>Total Supply</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>Max Supply</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>24h Low / 24h High</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>ATH</dt>
          <dd></dd>
        </dl>
      </div>
      <div className="chart"></div>
    </div>
  );
};

export default CoinDetails;
