import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';
import Header from '../components/header';
import SearchBar from '../components/search-bar';
import StockQuote from '../components/stock-quote';
import StockChart from '../components/stock-chart';
// import StockWidget from '../components/stock-widget';

import { BASE_API_URL, ROUTES } from '../constants';

function Home() {
  const [symbol, setSymbol] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState({ data: [], loading: false });
  const [watchlist, setWatchlist] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!watchlist) {
      if (isAuthenticated()) {
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

    if (location.state) {
      if (ROUTES.includes(location.state.previousPath)) {
        setShowSearch(true);
        history.replace();
      }
    }
  }, [history, watchlist, location.state]);

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

  return (
    <Fragment>
      <Header
        setSymbol={setSymbol}
        setQuote={setQuote}
        setWatchlist={setWatchlist}
        setShowSearch={setShowSearch}
      />
      <SearchBar
        setSymbol={setSymbol}
        symbol={symbol}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
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
