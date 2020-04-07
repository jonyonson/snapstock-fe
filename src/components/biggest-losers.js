import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StockList from './common/stock-list';

import { BASE_API_URL } from '../constants';

function BiggestLosers() {
  const [biggestLosers, setBiggestLosers] = useState([]);

  useEffect(() => {
    const url = `${BASE_API_URL}/api/stocks/market/list/losers`;
    axios
      .get(url)
      .then((res) => {
        setBiggestLosers(res.data);
      })
      .catch((err) => {
        // TODO: handle errors
        console.error(err);
      });
  }, []);

  return (
    <Section>
      <div className="section-title">
        <span>Biggest Losers</span>
      </div>
      <StockList stockList={biggestLosers} displayLength={5} />
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 2rem;
`;

export default BiggestLosers;
