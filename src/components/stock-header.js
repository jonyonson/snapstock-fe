import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import theme from '../styles/theme';
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
    } else if (!isFollowing) {
      const { symbol, companyName: company_name } = quote;
      const URL = `${BASE_API_URL}/api/watchlist`;
      const USER_ID = localStorage.getItem('userId');
      axios
        .post(URL, { symbol, company_name, user_id: USER_ID })
        .then((res) => {
          const { id, symbol, company_name } = res.data;
          setWatchlist((prev) => prev.concat({ id, symbol, company_name }));
        })
        .catch((err) => {
          // TODO: handle errors
          console.error(err);
        });
    }
  };

  return !quote ? null : (
    <StockHeader>
      <div
        className={
          quote.changePercent > 0
            ? 'green data-header__left'
            : 'red data-header__left'
        }
      >
        <h1 className="symbol">{quote.symbol}</h1>
        <h2 className="company-name">{quote.companyName}</h2>

        <WatchlistButton followStock={followStock} isFollowing={isFollowing} />
      </div>
      <div className="data-header__right">
        <div
          className={
            quote.changePercent > 0
              ? 'green data-header__left'
              : 'red data-header__left'
          }
        >
          <div className="price-wrapper">
            <span className="price">
              ${Number(quote.latestPrice).toFixed(2)}
            </span>
            {quote.changePercent > 0 ? (
              <ArrowUp size={24} color={theme.colors.gain} />
            ) : (
              <ArrowDown size={24} color={theme.colors.loss} />
            )}
          </div>
          <span className="change">{Number(quote.change).toFixed(2)}</span>
          <span className="change-percent">
            ({Number(quote.changePercent * 100).toFixed(2) + '%'})
          </span>
          <div className="latest-trading-day">
            Data as of {quote.latestTime}
          </div>
        </div>
        {/* <img
          className="logo"
          // src={`https://storage.googleapis.com/iex/api/logos/${quote.symbol}.png`}
          src={logoURL}
          alt={`${quote.companyName} Logo`}
        /> */}
      </div>
    </StockHeader>
  );
}

const StockHeader = styled.div`
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;

  .data-header__right {
    display: flex;
    flex-direction: column;
    /* align-items: flex-end; */
    /* justify-content: space-between; */
    justify-content: flex-start;
    min-width: 120px;
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

  .price {
    font-size: 1.4rem;
    font-weight: bold;
    margin-right: 0.75rem;

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
    margin-right: 5px;
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
    margin-top: 0.1rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    font-weight: 900;
  }
`;

export default StockQuote;
