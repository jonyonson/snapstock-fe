import React, { useState, Fragment, useEffect } from 'react';
import SearchBar from './search-bar';
import StockQuote from './stock-quote';
import StockChart from './stock-chart';
import axios from 'axios';

function App() {
  const [selection, setSelection] = useState(null);
  const [quote, setQuote] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const [chart, setChart] = useState({ data: [] });

  useEffect(() => {
    if (selection !== null) {
      const { symbol } = selection;
      const url = `http://localhost:5000/api/stocks/${symbol}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setQuote(res.data.quote);
          setLogoURL(res.data.logo.url);
          setChart({ data: res.data['intraday-prices'], type: 'intraday' });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selection]);

  const handleSearchSelection = (selection) => {
    console.log(selection);
    setSelection(selection);
  };

  return (
    <Fragment>
      <SearchBar onSelect={handleSearchSelection} />
      <StockQuote logoURL={logoURL} quote={quote} />
      <StockChart chart={chart} />
    </Fragment>
  );
}

export default App;
