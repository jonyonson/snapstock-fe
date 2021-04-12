import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/search-bar';
import LatestNews from '../components/latest-news';
import MostActive from '../components/most-active';
import BiggestLosers from '../components/biggest-losers';
import BiggestGainers from '../components/biggest-gainers';
import MarketIndices from '../components/market-indices';
import AppWrapper from '../components/app-wrapper';

function Home() {
  return (
    <AppWrapper>
      <ContentHeader className="test">
        <div className="flex-right">
          <SearchBar />
        </div>
        <div className="flex-left">
          <MarketIndices />
        </div>
      </ContentHeader>

      <Flex>
        <div className="flex-left">
          <LatestNews />
        </div>
        <div className="flex-right">
          <MostActive />
          <BiggestLosers />
          <BiggestGainers />
        </div>
      </Flex>
    </AppWrapper>
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

  .flex-left {
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
    /* margin-bottom: 3rem; */
  }
`;

export default Home;
