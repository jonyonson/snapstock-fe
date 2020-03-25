import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quote({ selection }) {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (selection !== null) {
      const { symbol } = selection;
      // const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
      const url = `http://localhost:5000/api/stocks/${symbol}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setQuote({ name: selection.name, ...res.data });
        })
        .catch((err) => console.log(err));
    }
  }, [selection]);

  return quote === null ? null : (
    <>
      <h1>{quote.symbol}</h1>
      <h2>{quote.name}</h2>
      <h2>{quote.price}</h2>
      <h3>Open: {quote.open}</h3>
      <h3>High: {quote.high}</h3>
      <h3>Low: {quote.low}</h3>
      <h4>Volume: {quote.volume}</h4>
      <h4>Latest Trading Day: {quote.latest_trading_day}</h4>
      <h4>Previous Close: {quote.previous_close}</h4>
      <h4>Change: {quote.change}</h4>
      <h4>Percent Change: {quote.change_percent}</h4>
      <img src={quote.logo_url} alt={`${quote.name} Logo`} />
    </>
  );
}

export default Quote;
