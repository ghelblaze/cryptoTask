import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ id }) => {
  const [historyChart, setHistoryChart] = useState([]);
  const [days, setDays] = useState(1);

  const fetchChart = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/" +
          id +
          "/market_chart?vs_currency=usd&days=" +
          days
      )
      .then((res) => {
        setHistoryChart(res.prices);
        console.log(res.prices);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchChart();
  }, [days]);

  return (
    <div>
      <div>
        <label htmlFor="select_days">Select Time</label>
        <select
          className="col-sm-4 mx-auto"
          name="select_days"
          id="total_coins"
          onChange={(e) => setDays(e.target.value)}
          value={days}
        >
          <option value="1"> 24h</option>
          <option value="7"> 7d</option>
          <option value="30"> 30d</option>
          <option value="365">Year</option>
        </select>
      </div>
      <div>
        <Line
          data={{
            labels: historyChart.map((price) => {
              return `${price[0].gethours()} ${price[0].getMinutes()}`;
            }),
            datasets: [
              {
                data: historyChart.map((price) => price[1]),
                label: `Price (past ${days} day(s)) in USD`,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
