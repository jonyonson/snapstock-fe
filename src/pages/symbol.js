import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../components/search-bar';
import StockHeader from '../components/stock-header';
import StockChart from '../components/stock-chart';
import KeyData from '../components/key-data';
import CompanyProfile from '../components/company-profile';
import BarLoader from '../components/BarLoader';
import Layout from '../components/Layout';
import { PATHS } from '../config/constants';
import reducer, { initialState } from '../reducers/symbol-reducer';
import { useAuth } from '../hooks/use-auth';

function SymbolPage() {
  const [symbol, setSymbol] = useState('');
  const [watchlist, setWatchlist] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const auth = useAuth();

  useEffect(() => {
    console.log('watchlist', watchlist);
    if (!watchlist) {
      if (auth.user) {
        axios
          .get(PATHS.API.WATCHLIST, {
            params: { uuid: auth.user.uid },
          })
          .then((res) => setWatchlist(res.data))
          .catch((err) => console.error(err));
      }
    }
  }, [watchlist, auth.user]);

  useEffect(() => setSymbol(params.symbol), [params]);

  useEffect(() => {
    if (symbol) {
      dispatch({ type: 'RESET' });
      axios
        .get(PATHS.API.STOCKS + symbol)
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
    <Layout>
      <BarLoader />
    </Layout>
  ) : (
    <Layout>
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
    </Layout>
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
