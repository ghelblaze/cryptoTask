import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Trending = () => {
    const [trending, setTrending]=useState([])

    useEffect( () => {
      axios
        .get(`https://api.coingecko.com/api/v3/search/trending`)
        .then((res) => {
         setTrending(res.data.coins);
         console.log(res.data.coins)
        });
    }, []);
  return (
    <div>
        {trending.map((item,idx)=>{
            return(
                <div key={item.coin_id}>
                    <img src={item.symbol} alt="coin_logo" />
                    <p>{item.id} </p>
                </div>
            )
        })}
    </div>
  )
}

export default Trending