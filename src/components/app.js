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
  const [watchlist, setWatchlist] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params.symbol) {
      setSymbol(params.symbol);
    }
  }, [params]);

  useEffect(() => {
    if (symbol) {
      // SET THE CHART COMPONENT'S LOADING STATE TO TRUE
      const quoteURL = `${BASE_API_URL}/api/stocks/${symbol}`;
      const chartURL = `${BASE_API_URL}/api/stocks/av/${symbol}/chart/1d`;

      setChart((prev) => ({ ...prev, loading: true }));

      const quoteRequest = axios.get(quoteURL);
      const chartRequest = axios.get(chartURL);

      axios
        .all([quoteRequest, chartRequest])
        .then(
          axios.spread((...responses) => {
            const quoteResponse = responses[0];
            const chartResponse = responses[1];
            setQuote(quoteResponse.data.quote);
            setChart({
              '1d': chartResponse.data,
              data: chartResponse.data,
              type: '1d',
              loading: false,
            });
          }),
        )
        .catch((error) => {
          setChart((prev) => ({ ...prev, loading: false }));
          // TODO: handle errors
          console.log(error);
        });
    }
  }, [symbol]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('watchlist', watchlist);
      const USER_ID = localStorage.getItem('userId');
      const url = `${BASE_API_URL}/api/watchlist/${USER_ID}`;
      axios
        .get(url)
        .then((res) => {
          setWatchlist(res.data);
        })
        .catch((err) => {
          // TODO: handle errors
          console.error(err);
        });
    }
  }, []);

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
