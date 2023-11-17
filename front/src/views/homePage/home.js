import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Trending from "../../components/Trending";
import millify from "millify";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [listLength, setlistLength] = useState(100);
  const navigate = useNavigate();

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

      <table className="mx-auto mt-5 table table-dark table-hover col-xl-6 ">
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
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
                <tr
                  key={idx}
                  className="mb-2 tableRow"
                  onClick={() => navigate("/coin/" + val.id)}
                >
                  <td className="rank">{val.market_cap_rank}</td>
                  <td className="logo">
                    <img src={val.image} alt="logo" width="30px" />
                    <p>{val.name}</p>
                  </td>
                  <td className="symbol">{val.symbol}</td>
                  <td>{millify(val.market_cap)}$</td>
                  <td>{val.current_price.toFixed(2)}$</td>
                  <td>{millify(val.circulating_supply)}</td>
                  <td>{millify(val.total_volume.toFixed(0))}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
