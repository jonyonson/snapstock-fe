import React, { useState, Fragment, useEffect } from 'react';
import SearchBar from './search-bar';
import Quote from './quote';
import CompanyNews from './company-news';
import axios from 'axios';

function App() {
  const [selection, setSelection] = useState(null);
  const [quote, setQuote] = useState(null);
  const [news, setNews] = useState([]);
  const [logoURL, setLogoURL] = useState(null);

  useEffect(() => {
    if (selection !== null) {
      const { symbol } = selection;
      // const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
      const url = `http://localhost:5000/api/stocks/${symbol}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setQuote(res.data.quote);
          setLogoURL(res.data.logo.url);
          setNews(res.data.news);
        })
        .catch((err) => console.log(err));
    }
  }, [selection]);

  const handleSearchSelection = (selection) => {
    console.log(selection);
    setSelection(selection);
  };

  return (
    <Fragment>
      <SearchBar onSelect={handleSearchSelection} />
      <Quote logoURL={logoURL} quote={quote} />
      {false && <CompanyNews news={news} />}
    </Fragment>
  );
}

export default App;
