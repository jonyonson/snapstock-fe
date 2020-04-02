import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import SearchBar from '../components/search-bar';
import StockQuote from '../components/stock-quote';
import StockChart from '../components/stock-chart';
// import StockWidget from '../components/stock-widget';
import axios from 'axios';

import { BASE_API_URL } from '../constants';

function Home() {
  const [symbol, setSymbol] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState({ data: [], loading: false });
  const [watchlist, setWatchlist] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (!watchlist) {
      if (localStorage.getItem('token')) {
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
    }
  });

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

  // console.log(watchlist);
  return (
    <Fragment>
      <Header
        setSymbol={setSymbol}
        setQuote={setQuote}
        setWatchlist={setWatchlist}
      />
      <SearchBar setSymbol={setSymbol} />
      <StockQuote
        quote={quote}
        setWatchlist={setWatchlist}
        watchlist={watchlist}
      />
      <StockChart chart={chart} setChart={setChart} symbol={symbol} />

      {/* <div style={{ padding: '1rem' }}>
        {watchlist &&
          watchlist.map((stock) => {
            const color = ['#ce2b2b', '#008456'][Math.floor(Math.random() * 2)];
            return <StockWidget key={stock.id} stock={stock} color={color} />;
          })}
      </div> */}
    </Fragment>
  );
}

export default Home;
