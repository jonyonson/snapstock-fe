import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header';
import SearchBar from './search-bar';
import StockQuote from './stock-quote';
import StockChart from './stock-chart';
import axios from 'axios';
import { BASE_API_URL } from '../constants';

function App() {
  const [selection, setSelection] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState({ data: [], loading: false });
  const [symbol, setSymbol] = useState('');
  const params = useParams();

  // set the current symbol based on the input selection
  // if selection is null, check the params for a symbol
  useEffect(() => {
    // if the user was routed here by selected a stock from the search
    if (selection) {
      setSymbol(selection.symbol);
      // in case the user navitated to this route manually `/stocks/aapl`
    } else if (params.symbol) {
      setSymbol(params.symbol);
      // else make sure everyhting is set back to the default
    } else {
      setSelection(null);
      setChart({ data: [], loading: false });
    }
  }, [params, selection]);

  useEffect(() => {
    if (symbol.length) {
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
      <Header setSelection={setSelection} setQuote={setQuote} />
      <SearchBar setSelection={setSelection} />
      <StockQuote quote={quote} />
      <StockChart chart={chart} setChart={setChart} selection={selection} />
    </Fragment>
  );
}

export default App;
