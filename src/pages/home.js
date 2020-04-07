import React, { Fragment } from 'react';
import styled from 'styled-components';
import useWindowSize from '../hooks/use-window-size';
import Container from '../components/common/container';
import Header from '../components/header';
import SearchBar from '../components/search-bar';
import HeadlineNews from '../components/headline-news';
import MostActive from '../components/most-active';
import BiggestLosers from '../components/biggest-losers';
import BiggestGainers from '../components/biggest-gainers';
import Indices from '../components/major-indices';

function Home() {
  const { width } = useWindowSize();

  return (
    <Fragment>
      <Header />
      <Container>
        {width < 770 && (
          <Fragment>
            <SearchBar />
            <Indices />
          </Fragment>
        )}

        <HeadlineNews />

        <Section>
          <StockLists>
            <MostActive />
            <BiggestLosers />
            <BiggestGainers />
          </StockLists>
          <div className="placeholder" />
        </Section>
      </Container>
    </Fragment>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 770px) {
    flex-direction: row;
  }

  .placeholder {
    border: 1px solid black;
    background-color: #ccc;

    @media (min-width: 770px) {
      flex-grow: 1;
      min-width: 60%;
      max-width: 60%;
    }
  }
`;

const StockLists = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 770px) {
    flex-grow: 1;
    /* width: 40%; */
    /* margin-right: 2rem; */
    margin-left: 2rem;
    order: 2;
  }
`;

export default Home;
