import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';
import Container from '../components/common/container';
import Header from '../components/header';
import SearchBar from '../components/search-bar';
import StockHeader from '../components/stock-header';
import StockChart from '../components/stock-chart';
import KeyData from '../components/key-data';
import CompanyProfile from '../components/company-profile';
import HeadlineNews from '../components/headline-news';
import MostActive from '../components/most-active';

import { BASE_API_URL, ROUTES } from '../constants';

function Home() {
  const [symbol, setSymbol] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState({ data: [] });
  const [chartLoading, setChartLoading] = useState(false);
  const [watchlist, setWatchlist] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [logoURL, setLogoURL] = useState(null);

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
      setChartLoading(true);

      const quoteURL = `${BASE_API_URL}/api/stocks/${symbol}`;
      const chartURL = `${BASE_API_URL}/api/stocks/av/${symbol}/chart/1d`;
      const quoteRequest = axios.get(quoteURL);
      const chartRequest = axios.get(chartURL);

      axios
        .all([quoteRequest, chartRequest])
        .then(
          axios.spread((...responses) => {
            const quoteResponse = responses[0];
            setQuote(quoteResponse.data.quote);
            setCompanyProfile(quoteResponse.data.company);
            setLogoURL(quoteResponse.data.logo.url);
            const chartResponse = responses[1];
            const chartData = chartResponse.data;
            setChart({ '1d': chartData, data: chartData, type: '1d' });
            setChartLoading(false);
          }),
        )
        .catch((error) => {
          setChartLoading(false);
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
      <Container>
        <SearchBar
          setSymbol={setSymbol}
          symbol={symbol}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          setChartLoading={setChartLoading}
          chartLoading={chartLoading}
        />

        {location.pathname === '/' && <HeadlineNews />}
        {location.pathname === '/' && <MostActive />}
        <StockHeader
          quote={quote}
          setWatchlist={setWatchlist}
          watchlist={watchlist}
          logoURL={logoURL}
        />
        <StockChart
          chart={chart}
          setChart={setChart}
          symbol={symbol}
          chartLoading={chartLoading}
          setChartLoading={setChartLoading}
        />
        <KeyData quote={quote} />
        <CompanyProfile profile={companyProfile} />
      </Container>
    </Fragment>
  );
}

export default Home;
