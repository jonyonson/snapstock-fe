import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import isAuthenticated from '../utils/isAuthenticated';
import StockList from '../components/common/stock-list';
import AppWrapper from '../components/common/app-wrapper';

import { BASE_API_URL } from '../constants';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) {
      const url = `${BASE_API_URL}/api/watchlist`;
      axiosWithAuth()
        .get(url)
        .then((res) => {
          setWatchlist(res.data);
        })
        .catch((err) => {
          // TODO: handle errors
          console.error(err);
        });
    }
  }, []);

  return !isAuthenticated() ? (
    <Redirect to={{ pathname: '/signin', state: { referrer: 'watchlist' } }} />
  ) : (
    <AppWrapper>
      <Section>
        <div className="section-title">
          <span>Watchlist</span>
        </div>
        <StockList stockList={watchlist} />
      </Section>
    </AppWrapper>
  );
}

const Section = styled.div`
  margin-bottom: 2rem;
`;

export default Watchlist;
