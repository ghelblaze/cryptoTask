import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import Chart from "../../components/Chart";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin"
        );
        setCoin(response.data);

        console.log(coin);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(coin);
  return (
    <div>
      {loading ? (
        <p>Loading Data...</p>
      ) : (
        <div>
          <div className="aside col-3">
            <div>
              <img src={coin.image.small} alt="coin_logo" />
              <p>{coin.name}</p>
              <p>Description:</p>
              <p>{coin.description.en.substring(0, 100)}</p>
            </div>
            <dl>
              <dt>Market Rank</dt>
              <dd>{coin.name}</dd>
            </dl>
            <dl>
              <dt>Market Cap</dt>
              <dd>{millify(coin.market_data.market_cap.usd)}</dd>
            </dl>
            <dl>
              <dt>Volume 24H</dt>
              <dd>{millify(coin.market_data.total_volume.usd)}</dd>
            </dl>
            <dl>
              <dt>Total Supply</dt>
              <dd>{millify(coin.market_data.total_supply)}</dd>
            </dl>
            <dl>
              <dt>Max Supply</dt>
              <dd>{millify(coin.market_data.max_supply)}</dd>
            </dl>
            <dl>
              <dt>24h Low / 24h High</dt>
              <dd>
                {millify(coin.market_data.low_24h.usd)}/
                {millify(coin.market_data.high_24h.usd)}
              </dd>
            </dl>
            <dl>
              <dt>ATH</dt>
              <dd>{millify(coin.market_data.ath.usd)}</dd>
            </dl>
          </div>
          <div className="chart col-9">
            <Chart id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
