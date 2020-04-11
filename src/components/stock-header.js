import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import theme from '../styles/theme';
import formatNumber from '../utils/formatNumber';
import isAuthenticated from '../utils/isAuthenticated';
import WatchlistButton from './watchlist-button';
import {
  FaLongArrowAltUp as ArrowUp,
  FaLongArrowAltDown as ArrowDown,
} from 'react-icons/fa';

import { BASE_API_URL } from '../constants';

function StockQuote({ quote, setWatchlist, watchlist, logoURL }) {
  const [isFollowing, setIsFollowing] = useState();
  const history = useHistory();

  useEffect(() => {
    if (watchlist && quote) {
      setIsFollowing(watchlist.some((stock) => stock.symbol === quote.symbol));
    }
  }, [watchlist, quote]);

  const followStock = () => {
    if (!isAuthenticated()) {
      history.push({
        pathname: '/signin',
        state: { referrer: 'watchlist' },
      });
    }

    const URL = `${BASE_API_URL}/api/watchlist`;
    const USER_ID = localStorage.getItem('userId');

    if (!isFollowing) {
      const { symbol, companyName: company_name } = quote;
      axios
        .post(URL, { symbol, company_name, user_id: USER_ID })
        .then((res) => {
          const { id, symbol, company_name } = res.data;
          setWatchlist((prev) => prev.concat({ id, symbol, company_name }));
        })
        .catch((err) => console.error(err));
    } else {
      const remove = watchlist.find((stock) => stock.symbol === quote.symbol);
      setWatchlist(watchlist.filter((stock) => stock.id !== remove.id));
      axiosWithAuth()
        .delete(URL + `/${USER_ID}/${remove.id}`)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };

  return !quote ? null : (
    <StockHeader>
      <div className="data-header__left">
        <div>
          <h1 className="symbol">{quote.symbol}</h1>
          <h2 className="company-name">{quote.companyName}</h2>
        </div>

        <WatchlistButton followStock={followStock} isFollowing={isFollowing} />
      </div>
      <div
        className={
          quote.changePercent > 0
            ? 'data-header__right green'
            : 'data-header__right red'
        }
      >
        <div className="price-wrapper">
          <span className="price">{formatNumber(quote.latestPrice, '$')}</span>
          {quote.changePercent > 0 ? (
            <ArrowUp size={24} color={theme.colors.gain} />
          ) : (
            <ArrowDown size={24} color={theme.colors.loss} />
          )}
        </div>
        <div className="change-wrapper">
          <span className="change">
            {formatNumber(quote.change, null, true)}
          </span>
          <span className="change-percent">
            {formatNumber(quote.changePercent * 100, '%', true)}
          </span>
        </div>
        <div className="latest-trading-day">Data as of {quote.latestTime}</div>
      </div>
    </StockHeader>
  );
}

const StockHeader = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;

  @media (min-width: 770px) {
    margin-top: 0;
    margin-bottom: 0;
  }

  .data-header__left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .data-header__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    white-space: nowrap;
  }

  .logo {
    margin-top: 5px;
    max-height: 60px;
  }

  .symbol {
    font-size: 2.2rem;
    font-weight: 300;
    margin: 0;

    @media (min-width: 500px) {
      font-size: 2.5rem;
    }
  }

  .company-name {
    font-size: 0.9375rem;
    font-weight: 900;
    margin: 0 0 1rem;

    @media (min-width: 500px) {
      font-size: 1.1rem;
    }
  }

  .price-wrapper {
    display: flex;
    align-items: center;
  }

  .change-wrapper {
    display: flex;
  }

  .price {
    font-size: 1.4rem;
    font-weight: bold;

    @media (min-width: 500px) {
      font-size: 1.6rem;
    }
  }

  .green .change,
  .green .change-percent {
    color: ${(props) => props.theme.colors.gain};
  }

  .red .change,
  .red .change-percent {
    color: ${(props) => props.theme.colors.loss};
  }

  .change {
    margin-right: 10px;
  }

  .change,
  .change-percent {
    font-size: 1.2rem;
    font-weight: bold;

    @media (min-width: 500px) {
      font-size: 1.4rem;
    }
  }

  .latest-trading-day {
    font-size: 0.6875rem;
    color: rgba(0, 0, 0, 0.7);
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 2rem;

    @media (min-width: 375px) {
      font-size: 0.8125rem;
    }
  }
`;

export default StockQuote;
