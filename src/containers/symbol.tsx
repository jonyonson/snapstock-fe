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

// type FixMeLater = any;

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
  const params: { symbol: string } = useParams();

  const initialState = {
    quote: null,
    stats: null,
    // chartLoading: false,
    chartLoading: true,
    companyProfile: null,
    error: null,
    chart: { '1d': [], data: [] },
  };

  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      // case 'FETCHING_DATA':
      //   return { ...state, chartLoading: true };

      case 'FETCH_SUCCESS':
        return {
          ...state,
          chartLoading: false,
          error: null,
          quote: action.payload.quote,
          stats: action.payload.stats,
          companyProile: action.payload.company,
          chart: {
            '1d': action.payload['intraday-prices'],
            data: action.payload['intraday-prices'],
            type: '1d',
          },
        };

      case 'FETCH_FAIL':
        return {
          ...state,
          chartLoading: false,
          error: action.payload,
          companyProfile: null,
          quote: null,
          chart: { '1d': [], data: [] },
        };

      case 'UPDATE_RANGE':
        console.log(action.payload);
        return {
          ...state,
          chart: {
            ...state.chart,
            type: action.payload.type,
            [action.payload.type]: action.payload.data,
            data: action.payload.data,
          },
        };

      default:
        return state;
    }
  }, initialState);

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
      // dispatch({ type: 'FETCHING_DATA' });
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

  let { chartLoading, error, quote, stats, companyProfile, chart } = state;

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
            chart={chart}
            setChart={(payload) => dispatch({ type: 'UPDATE_RANGE', payload })}
            symbol={symbol}
          />
          <KeyData quote={quote} stats={stats} />
        </div>
        <div className="flex-right">
          <CompanyProfile profile={companyProfile} />
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
