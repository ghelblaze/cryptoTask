import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/" +
            id +
            "/market_chart?vs_currency=usd&days=" +
            selectedInterval
        );

        const chartData = response.data.prices.map((price) => ({
          date: new Date(price[0]),
          value: price[1],
        }));

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedInterval]);

  useEffect(() => {
    if (chartData) {
      drawChart();
    }
  }, [chartData]);

  const drawChart = () => {
    d3.select("#chart-container").selectAll("*").remove();
    const margin = { top: 10, right: 10, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.date))
      .range([0, width]);

    const yMinValue = d3.min(chartData, (d) => d.value) - 10; // Adjust the offset as needed

    const y = d3
      .scaleLinear()
      .domain([yMinValue, d3.max(chartData, (d) => d.value)])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));
  };
  const handleIntervalChange = (e) => {
    setSelectedInterval(e.target.value);
  };

  return (
    <>
      <div className="mb-5 mt-5">
        <label htmlFor="intervalSelect">Select Time Interval:</label>
        <select
          id="intervalSelect"
          onChange={handleIntervalChange}
          value={selectedInterval}
        >
          <option value="1">24 Hours</option>
          <option value="7">7 Days</option>
          <option value="90">3 Months</option>
        </select>
      </div>
      <div id="chart-container" />
    </>
  );
};

export default Chart;
