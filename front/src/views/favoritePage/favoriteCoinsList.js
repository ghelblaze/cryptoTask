import axios from "axios";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FavoriteCoinsList = () => {
  const navigate = useNavigate();
  const [favCoinsData, setFavCoinsData] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [toggle, setToggle] = useState(false);
  const minus = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="14"
      viewBox="0 0 448 512"
    >
      <path
        fill="#ce0d0d"
        d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
      />
    </svg>
  );
  const deleteCoin = async (coinId) => {
    try {
      const coinDeleted = await axios.post(
        "http://localhost:8000/api/deleteFavCoin",
        {
          coinId,
        },
        { withCredentials: true }
      );
      console.log(coinDeleted.data);
      setToggle(!toggle);
    } catch (error) {
      console.error("Error deleting Coin:", error);
    }
  };
  useEffect(() => {
    const fetchFavoriteCoins = async () => {
      try {
        const favCoinsList = await axios.get(
          "http://localhost:8000/api/favorites",
          {
            withCredentials: true,
          }
        );

        const coingeckoRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favCoinsList.data.join(
            ","
          )}`
        );
        setFavCoinsData(coingeckoRes.data);
        setLoadState(true);
        console.log(coingeckoRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFavoriteCoins();
  }, [toggle]);

  return (
    <div>
      <h1 className="my-5">Your Favorite Coins</h1>
      {loadState ? (
        <table className="mx-auto col-9">
          <thead>
            <tr>
              <td>Rank</td>
              <td>favorite</td>
              <td>Name</td>
              <td>Symbol</td>
              <td>Market Cap</td>
              <td>Price</td>
              <td>Circulating Supply</td>
              <td>Volume(24hrs)</td>
            </tr>
          </thead>
          <tbody>
            {favCoinsData.map((coin, idx) => {
              return (
                <tr
                  key={idx}
                  className="mb-2 tableRow"
                  /* onClick={() => navigate("/coin/" + coin.id)} */
                >
                  <td className="rank">{coin.market_cap_rank}</td>
                  <td>
                    <div onClick={() => deleteCoin(coin.id)}>{minus}</div>
                  </td>
                  <td className="logo">
                    <div className="logodata">
                      <img src={coin.image} alt="logo" width="30px" />
                      <p className="coinName">{coin.name}</p>
                    </div>
                  </td>
                  <td className="symbol">{coin.symbol}</td>
                  <td>{millify(coin.market_cap)}$</td>
                  <td>{coin.current_price.toFixed(2)}$</td>
                  <td>{millify(coin.circulating_supply)}</td>
                  <td>{millify(coin.total_volume.toFixed(0))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>list is empty</h1>
      )}
    </div>
  );
};

export default FavoriteCoinsList;
