import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axios-with-auth';
import styled from 'styled-components';
import isAuthenticated from '../utils/is-authenticated';
import StockList from '../components/stock-list';
import AppWrapper from '../components/app-wrapper';
import SearchBar from '../components/search-bar';

import { BASE_API_URL } from '../constants';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      axiosWithAuth()
        .get(BASE_API_URL + '/api/watchlist')
        .then((res) => {
          setIsLoading(false);
          setWatchlist(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }
  }, []);

  return !isAuthenticated() ? (
    <Redirect to={{ pathname: '/signin', state: { referrer: 'watchlist' } }} />
  ) : (
    <AppWrapper>
      <Section>
        <div className="search-wrapper">
          <SearchBar />
        </div>
        {!isLoading && (
          <Fragment>
            <div className="section-title">
              <span>Watchlist</span>
            </div>
            {watchlist.length > 0 ? (
              <StockList stockList={watchlist} />
            ) : (
              <div>There are no securities saved to your watchlist. </div>
            )}
          </Fragment>
        )}
      </Section>
    </AppWrapper>
  );
}

const Section = styled.div`
  .search-wrapper {
    margin-bottom: 2rem;
  }

  margin-bottom: 2rem;
`;

export default Watchlist;
