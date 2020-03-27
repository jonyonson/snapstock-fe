import React, { useState, Fragment, useEffect } from 'react';
import SearchBar from './search-bar';
import StockQuote from './stock-quote';
import StockChart from './stock-chart';
import axios from 'axios';

function App() {
  const [selection, setSelection] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState({ intraday: [], type: 'intraday' });

  useEffect(() => {
    if (selection) {
      const { symbol } = selection;
      const url = `http://localhost:5000/api/stocks/${symbol}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          const intraday = res.data['intraday-prices'];
          setChart((prev) => ({ ...prev, intraday, type: 'intraday' }));
          setQuote(res.data.quote);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selection]);

  const handleSearchSelection = (selection) => {
    setSelection(selection);
  };

  return (
    <Fragment>
      <SearchBar onSelect={handleSearchSelection} />
      <StockQuote quote={quote} />
      <StockChart chart={chart} setChart={setChart} selection={selection} />
    </Fragment>
  );
}

export default App;
