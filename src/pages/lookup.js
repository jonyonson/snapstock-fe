import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import isAuthenticated from '../utils/isAuthenticated';
import Container from '../components/common/container';
import SearchBar from '../components/search-bar';
import StockHeader from '../components/stock-header';
import StockChart from '../components/stock-chart';
import KeyData from '../components/key-data';
import CompanyProfile from '../components/company-profile';
import BarLoader from '../components/common/bar-loader';
import AppWrapper from '../components/common/app-wrapper';

import { BASE_API_URL } from '../constants';

function Lookup() {
  const [symbol, setSymbol] = useState(null);
  const [quote, setQuote] = useState(null);
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState({ data: [] });
  const [chartLoading, setChartLoading] = useState(false);
  const [watchlist, setWatchlist] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    if (!watchlist) {
      if (isAuthenticated()) {
        const USER_ID = localStorage.getItem('userId');
        const url = `${BASE_API_URL}/api/watchlist/${USER_ID}`;
        axios
          .get(url)
          .then((res) => setWatchlist(res.data))
          .catch((err) => console.error(err));
      }
    }
  }, [watchlist]);

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
          axios.spread((quoteResponse, chartResponse) => {
            setError(null);
            setQuote(quoteResponse.data.quote);
            setStats(quoteResponse.data.stats);
            setCompanyProfile(quoteResponse.data.company);
            setLogoURL(quoteResponse.data.logo.url);

            const chartData = chartResponse.data;
            setChart({ '1d': chartData, data: chartData, type: '1d' });
            setChartLoading(false);
          }),
        )
        .catch((error) => {
          setChartLoading(false);
          setChart({ data: [] });
          setQuote(null);
          setCompanyProfile(null);
          setError(error.response.data);
          console.log(error.response);
        });
    }
  }, [symbol]);

  return (
    <AppWrapper>
      <Container>
        {chartLoading ? (
          <BarLoader />
        ) : (
          <Fragment>
            <Flex className={error ? 'error' : undefined}>
              <div className="flex-right">
                <SearchBar />
              </div>
              <div className="flex-left">
                <StockHeader
                  quote={quote}
                  setWatchlist={setWatchlist}
                  watchlist={watchlist}
                  logoURL={logoURL}
                />
              </div>
            </Flex>
            <Flex>
              <div className="flex-left">
                <StockChart
                  chart={chart}
                  setChart={setChart}
                  symbol={symbol}
                  chartLoading={chartLoading}
                  setChartLoading={setChartLoading}
                />
                <KeyData quote={quote} stats={stats} />
              </div>
              <div className="flex-right">
                <CompanyProfile profile={companyProfile} />
              </div>
            </Flex>
            {error && <Error>Something went wrong. Please try again.</Error>}
          </Fragment>
        )}
      </Container>
    </AppWrapper>
  );
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 770px) {
    flex-direction: row;
    margin-top: 2rem;
  }

  &.error {
    flex-direction: column;
    .flex-right {
      margin-left: 0;
    }
  }

  .flex-left {
    @media (min-width: 770px) {
      max-width: 65%;
      min-width: 65%;
    }
  }

  .flex-right {
    @media (min-width: 770px) {
      flex-grow: 1;
      margin-left: 2rem;
      order: 2;
    }
  }
`;

const Error = styled.div`
  margin-top: 2rem;
  font-size: 22px;
`;
export default Lookup;
