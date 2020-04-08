import React, { Fragment } from 'react';
import styled from 'styled-components';
import Container from '../components/common/container';
import Header from '../components/header';
import SearchBar from '../components/search-bar';
import LatestNews from '../components/latest-news';
import MostActive from '../components/most-active';
import BiggestLosers from '../components/biggest-losers';
import BiggestGainers from '../components/biggest-gainers';
import Indices from '../components/major-indices';

function Home() {
  return (
    <Fragment>
      <Header />
      <Container>
        <ContentHeader>
          <div className="flex-right">
            <SearchBar />
          </div>
          <div className="flex-left">
            <Indices />
          </div>
        </ContentHeader>
        <LatestNews />
        <Flex>
          <StockLists>
            <MostActive />
            <BiggestLosers />
            <BiggestGainers />
          </StockLists>
          <div className="placeholder" />
        </Flex>
      </Container>
    </Fragment>
  );
}

const ContentHeader = styled.div`
  .flex-left {
    margin-top: 1rem;
    @media (min-width: 770px) {
      margin-top: 0;
      max-width: 60%;
      min-width: 60%;
    }
  }

  .flex-right {
    order: 2;
    flex-grow: 1;

    @media (min-width: 770px) {
      margin-left: 2rem;
    }
  }

  @media (min-width: 770px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;
  }
`;

const Flex = styled.div`
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
