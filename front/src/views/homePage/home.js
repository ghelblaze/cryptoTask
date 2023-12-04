import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Trending from "../../components/Trending";
import millify from "millify";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [listLength, setlistLength] = useState(100);
  const navigate = useNavigate;
  const star = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="18"
      viewBox="0 0 576 512"
    >
      <path
        fill="#dfcf20"
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      />
    </svg>
  );
  const plus = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="14"
      viewBox="0 0 448 512"
    >
      <path
        fill="#efeff1"
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      />
    </svg>
  );
  const handleFavs = async (coinId) => {
    console.log(coinId);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addToFavorites",
        { coinId },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("Coin added to favorites:", data);
      } else {
        console.error("Failed to add coin to favorites");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${listLength}&page=1&sparkline=false&x_cg_demo_api_key=CG-CpCsUsa1iKcvBndZmQy1KZEa`
      )
      .then((res) => {
        setCrypto(res.data);
        console.log(res.data);
      });
  }, [listLength]);

  return (
    <div className="App bg-dark mx-auto">
      <div className="bg-primary trending_container">
        <Trending />
      </div>
      <h1 className="my-5">All Cryptocurrencies</h1>
      <div className="d-flex flex-column col-md-2 mx-auto ">
        <input
          className="search_box"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <label htmlFor="total_coins" className="my-3">
          Top
        </label>
        <select
          className="col-sm-4 mx-auto"
          name="total_coins"
          id="total_coins"
          onChange={(e) => setlistLength(e.target.value)}
          value={listLength}
        >
          <option value="100"> 100</option>
          <option value="200"> 200</option>
          <option value="1000"> 1000</option>
          <option value="100000">ALL coins</option>
        </select>
      </div>

      <table className="mx-auto mt-5  table-dark table-hover  width ">
        <thead>
          <tr>
            <td>Rank</td>
            <td>Favorite</td>
            <td className="name_field">Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Circulating Supply</td>
            <td>Volume(24hrs)</td>
          </tr>
        </thead>

        <tbody>
          {crypto
            .filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, idx) => {
              return (
                <tr key={idx} className="mb-2 tableRow">
                  <td className="rank">{val.market_cap_rank}</td>
                  <td>
                    <div onClick={() => handleFavs(val.id)}>{plus}</div>
                  </td>
                  <td className="logo">
                    <div className="logodata">
                      <img src={val.image} alt="logo" width="30px" />
                      <p className="coinName">{val.name}</p>
                    </div>
                  </td>

                  <td className="symbol">{val.symbol}</td>
                  <td>{millify(val.market_cap)}$</td>
                  <td>{val.current_price.toFixed(2)}$</td>
                  <td>{millify(val.circulating_supply)}</td>
                  <td>{millify(val.total_volume.toFixed(0))}</td>
                  <td>
                    <Link to={"/coin/" + val.id}>more</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
