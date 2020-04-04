import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StockList from './common/stock-list';

import { BASE_API_URL } from '../constants';

function BiggestLosers() {
  const [biggestGainers, setBiggestGainers] = useState([]);

  useEffect(() => {
    const url = `${BASE_API_URL}/api/stocks/market/list/gainers`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setBiggestGainers(res.data);
      })
      .catch((err) => {
        // TODO: handle errors
        console.error(err);
      });
  }, []);

  return (
    <Section>
      <div className="section-title">
        <span>Biggest Gainers</span>
      </div>
      <StockList stockList={biggestGainers} displayLength={5} />
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 2rem;
`;

export default BiggestLosers;
