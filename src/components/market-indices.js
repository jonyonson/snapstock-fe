import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useInterval from '../hooks/use-interval';
import { PATHS } from '../config/constants';
import Widget from './index-widget';

export default function MarketIndices() {
  const [dow, setDow] = useState(null);
  const [sp500, setSp500] = useState(null);
  const [nasdaq, setNasdaq] = useState(null);

  const fetchMarketData = () => {
    axios
      .get(PATHS.API.MARKET_INDICES)
      .then((res) => {
        const { nasdaq, sp500, dow } = res.data;
        setDow(dow);
        setNasdaq(nasdaq);
        setSp500(sp500);
      })
      .catch((err) => console.error(err));
  };

  // Fetch market index data every 15 seconds
  useInterval(fetchMarketData, 15000, true);

  return (
    <StyledContainer>
      <Widget name="DOW" index={dow} />
      <Widget name="NASDAQ" index={nasdaq} />
      <Widget name="S&P 500" index={sp500} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
