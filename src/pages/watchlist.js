import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import isAuthenticated from '../utils/isAuthenticated';
import Header from '../components/header';
import StockList from '../components/common/stock-list';
import Container from '../components/common/container';

import { BASE_API_URL } from '../constants';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) {
      const url = `${BASE_API_URL}/api/watchlist`;
      axiosWithAuth()
        .get(url)
        .then((res) => {
          console.log(res.data);
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
    <Fragment>
      <Header />
      <Container>
        <Section>
          <div className="section-title">
            <span>Watchliist</span>
          </div>
          <StockList stockList={watchlist} />
        </Section>
      </Container>
    </Fragment>
  );
}

const Section = styled.div`
  margin-bottom: 2rem;
`;

export default Watchlist;
