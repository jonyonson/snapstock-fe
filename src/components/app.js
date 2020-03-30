import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header';
import SearchBar from './search-bar';
import StockQuote from './stock-quote';
import StockChart from './stock-chart';
import axios from 'axios';

import { BASE_API_URL } from '../constants';

function App() {
  const [symbol, setSymbol] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState({ data: [], loading: false });
  const params = useParams();

  useEffect(() => {
    if (params.symbol) {
      // setChart({ data: [], loading: false });
      setSymbol(params.symbol);
    }
  }, [params]);

  useEffect(() => {
    if (symbol) {
      const url = `${BASE_API_URL}/api/stocks/${symbol}`;
      setChart((prev) => ({ ...prev, loading: true }));
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          const intraday = res.data['intraday-prices'];
          setChart({
            '1d': intraday,
            data: intraday,
            type: '1d',
            loading: false,
          });
          setQuote(res.data.quote);
          // TODO: replace logo when no longer using sandbox
          // setLogo(res.data.logo.url);
        })
        .catch((err) => {
          setChart((prev) => ({ ...prev, loading: false }));
          // TODO: handle errors
          // TODO: if a symbol couldn't be found redirect to '/'
          console.log(err);
        });
    }
  }, [symbol]);

  return (
    <Fragment>
      <Header setSymbol={setSymbol} setQuote={setQuote} />
      <SearchBar setSymbol={setSymbol} />
      <StockQuote quote={quote} />
      <StockChart chart={chart} setChart={setChart} symbol={symbol} />
    </Fragment>
  );
}

export default App;
