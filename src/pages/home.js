import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useWindowSize from '../hooks/use-window-size';
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
import BiggestLosers from '../components/biggest-losers';
import BiggestGainers from '../components/biggest-gainers';

import { BASE_API_URL } from '../constants';

function Home() {
  const [symbol, setSymbol] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chart, setChart] = useState({ data: [] });
  const [chartLoading, setChartLoading] = useState(false);
  const [watchlist, setWatchlist] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [logoURL, setLogoURL] = useState(null);

  const { width } = useWindowSize();
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
  }, [history, watchlist]);

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
      />
      <Container>
        {width < 770 && (
          <SearchBar
            setSymbol={setSymbol}
            symbol={symbol}
            setChartLoading={setChartLoading}
            chartLoading={chartLoading}
          />
        )}

        {location.pathname === '/' && (
          <Fragment>
            <HeadlineNews
              setSymbol={setSymbol}
              symbol={symbol}
              setChartLoading={setChartLoading}
              chartLoading={chartLoading}
            />
            <Section>
              <StockLists>
                <MostActive />
                <BiggestLosers />
                <BiggestGainers />
              </StockLists>
              <div className="placeholder" />
            </Section>
          </Fragment>
        )}

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

const Section = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 770px) {
    flex-direction: row;
  }

  .placeholder {
    border: 1px solid black;
    background-color: #ccc;

    @media (min-width: 770px) {
      flex-grow: 1;
    }
  }
`;

const StockLists = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 770px) {
    width: 60%;
    margin-right: 2rem;
  }
`;

export default Home;
