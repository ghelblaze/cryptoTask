import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/" + id)
      .then((res) => {
        setCoin(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(coin);
  return (
    <div>
      <div className="aside"></div>
      <div className="chart"></div>
    </div>
  );
};

export default CoinDetails;
