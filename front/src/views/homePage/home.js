import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  
	const [search, setSearch] = useState("");
	const [crypto, setCrypto] = useState([]);
	const [listLength, setlistLength] = useState(100);

	useEffect(() => {
		axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${listLength}&page=1&sparkline=false&x_cg_demo_api_key=CG-CpCsUsa1iKcvBndZmQy1KZEa`
      )
      .then((res) => {
        setCrypto(res.data);
      });
	}, [listLength]);

	return (
    <div className="App">
      <h1>All Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <label htmlFor="total_coins">Top</label>
      <select
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
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
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
                <tr key={idx}>
                  <td className="rank">{val.market_cap_rank}</td>
                  <td className="logo">
                    <img src={val.image} alt="logo" width="30px" />

                    <p>{val.name}</p>
                  </td>
                  <td className="symbol">{val.symbol}</td>
                  <td>${val.market_cap}</td>
                  <td>${val.current_price.toFixed(2)}</td>
                  <td>{val.availableSupply}</td>
                  <td>{val.total_volume.toFixed(0)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}



export default Home