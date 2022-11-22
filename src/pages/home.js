import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/search-bar';
import LatestNews from '../components/latest-news';
import MostActive from '../components/most-active';
import BiggestLosers from '../components/biggest-losers';
import BiggestGainers from '../components/biggest-gainers';
import MarketIndexes from '../components/MarketIndexes';
import Layout from '../components/Layout';
import useStore from '../store';
import { useEffect } from 'react';
import { PATHS } from '../config/constants';
import { useAuth } from '../hooks/use-auth';

function Home() {
  const auth = useAuth();

  // console.log(auth.user);
  const store = useStore((state) => state);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const params = new URLSearchParams({ uuid: auth.user.uid });
      const res = await fetch(`${PATHS.API.WATCHLIST}?${params}`);
      const data = await res.json();
      console.log('res', data);
      store.load(data);
    };

    if (auth.user && store.watchlist === null) {
      // store.load([{ symbol: 'AAPL', name: 'Apple', uuid: '123' }]);
      fetchWatchlist();
    }
  }, [auth.user]);

  return (
    <Layout>
      <ContentHeader>
        <div className="flex-right">
          <SearchBar />
        </div>
        <div className="flex-left">
          <MarketIndexes />
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
    </Layout>
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
  }
`;

export default Home;
