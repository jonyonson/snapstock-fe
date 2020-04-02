import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import isAuthenticated from '../utils/isAuthenticated';
import Header from '../components/header';

import { BASE_API_URL } from '../constants';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
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
  }, []);

  return isAuthenticated() ? (
    <Fragment>
      <Header />
      <StyledSection>
        <h1>Watchlist</h1>

        {watchlist.map((stock) => (
          <div key={stock.id}>{stock.symbol}</div>
        ))}
      </StyledSection>
    </Fragment>
  ) : (
    <Redirect to={{ pathname: '/signin', state: { referrer: 'watchlist' } }} />
  );
}

const StyledSection = styled.div`
  padding: 1rem;
`;

export default Watchlist;
