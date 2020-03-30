import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './header';

function Watchlist() {
  const isAuthenticated = !!window.localStorage.getItem('token');

  return isAuthenticated ? (
    <Fragment>
      <Header />
      <StyledSection>
        <h1>Watchlist</h1>
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
