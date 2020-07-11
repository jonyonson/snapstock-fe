import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import isAuthenticated from '../utils/isAuthenticated';
import SearchBar from '../components/search-bar';
import StockHeader from '../components/stock-header';
import StockChart from '../components/stock-chart';
import KeyData from '../components/key-data';
import CompanyProfile from '../components/company-profile';
import BarLoader from '../components/bar-loader';
import AppWrapper from '../components/app-wrapper';
import { BASE_API_URL } from '../constants';
import reducer, { initialState } from '../reducers/symbolReducer';

export interface Stock {
  id: number;
  symbol: string;
  company_name: string;
  latestPrice: number;
  change: number;
  changePercent: number;
  latestVolume: number;
  volume: number;
}

function SymbolPage() {
  const [symbol, setSymbol] = useState('');
  const [watchlist, setWatchlist] = useState<null | Stock[]>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const params: { symbol: string } = useParams();

  useEffect(() => {
    if (!watchlist) {
      if (isAuthenticated()) {
        axiosWithAuth()
          .get(BASE_API_URL + '/api/watchlist')
          .then((res) => setWatchlist(res.data))
          .catch((err) => console.error(err));
      }
    }
  }, [watchlist]);

  useEffect(() => setSymbol(params.symbol), [params]);

  useEffect(() => {
    if (symbol) {
      dispatch({ type: 'RESET' });
      axios
        .get(BASE_API_URL + '/api/stocks/' + symbol)
        .then((res) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_FAIL', payload: err.response.data });
        });
    }
  }, [symbol]);

  const { chartLoading, error, quote, stats, profile, chart } = state;

  return chartLoading ? (
    <AppWrapper>
      <BarLoader />
    </AppWrapper>
  ) : (
    <AppWrapper>
      <Flex className={error ? 'error' : undefined}>
        <div className="flex-right">
          <SearchBar />
        </div>
        <div className="flex-left">
          <StockHeader
            quote={quote}
            setWatchlist={setWatchlist}
            watchlist={watchlist}
          />
        </div>
      </Flex>
      <Flex>
        <div className="flex-left">
          <StockChart
            // chart={chart}
            initialChart={chart}
            // setChart={(payload) => dispatch({ type: 'UPDATE_RANGE', payload })}
            symbol={symbol}
          />
          <KeyData quote={quote} stats={stats} />
        </div>
        <div className="flex-right">
          <CompanyProfile profile={profile} />
        </div>
      </Flex>
      {error && <Error>Something went wrong. Please try again.</Error>}
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
export default SymbolPage;
