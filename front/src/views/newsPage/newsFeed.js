import React, { useEffect, useState } from 'react'
import axios from "axios"

const NewsFeed = () => {
  const [newsData, setNewsData]= useState([])

  	useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/news`)
      .then((res) => {
       setNewsData(res.data.data);
       console.log(res.data)
      });
    }, []);
 
  return (
    <div>
        {newsData.map((news,idx)=>{
          return(
            <div key={idx}>
              <p>{news.title} </p>
              <p>{news.description} </p>
              <p>{news.url} </p>
              <p>{news.author} </p>
            </div>
          )
        })}
    </div>
  )
}

export default NewsFeed