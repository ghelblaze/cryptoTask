import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";
import newsLogo from "../../assets/crypto.jpg";

const NewsFeed = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/news`).then((res) => {
      setNewsData(res.data.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="news-container">
      {newsData.map((news, idx) => {
        return (
          <div key={idx} className="card">
            <img
              src={news.thumb_2x ?? newsLogo}
              alt="newspic"
              className="card-img-top newsImg"
            />
            <div className="card-body">
              <h5 className="card-title">{news.title} </h5>
              <p className="card-text">{news.description.substring(0, 100)} </p>

              <button className="btn btn-primary moreBTN ">
                <a
                  href={news.url}
                  rel="external noreferrer"
                  target="_blank"
                  className="morebtnlink"
                >
                  more...
                </a>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;
