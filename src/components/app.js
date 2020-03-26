import React, { useState, Fragment, useEffect } from 'react';
import SearchBar from './search-bar';
import StockQuote from './stock-quote';
import StockChart from './stock-chart';
import CompanyNews from './company-news';
import axios from 'axios';

function App() {
  const [selection, setSelection] = useState(null);
  const [quote, setQuote] = useState(null);
  const [news, setNews] = useState([]);
  const [chart, setChart] = useState([]);
  const [logoURL, setLogoURL] = useState(null);

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
          setNews(res.data.news);
          setChart(res.data['intraday-prices'] || res.data.chart);
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
      <StockChart data={chart} />
      {false && <CompanyNews news={news} />}
    </Fragment>
  );
}

export default App;
