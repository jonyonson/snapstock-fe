import React, { useState, Fragment, useEffect } from 'react';
import Header from './header';
import SearchBar from './search-bar';
import StockQuote from './stock-quote';
import StockChart from './stock-chart';
import axios from 'axios';

function App() {
  const [selection, setSelection] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState({ data: [] });

  useEffect(() => {
    if (selection) {
      const { symbol } = selection;
      const url = `http://localhost:5000/api/stocks/${symbol}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          const intraday = res.data['intraday-prices'];
          setChart({ '1d': intraday, data: intraday, type: '1d' });
          setQuote(res.data.quote);
          // TODO: replace logo when no longer using sandbox
          // setLogo(res.data.logo.url);
        })
        .catch((err) => {
          // TODO: handle error
          console.log(err);
        });
    }
  }, [selection]);

  return (
    <Fragment>
      <Header />
      <SearchBar setSelection={setSelection} />
      <StockQuote quote={quote} />
      <StockChart chart={chart} setChart={setChart} selection={selection} />
    </Fragment>
  );
}

export default App;
