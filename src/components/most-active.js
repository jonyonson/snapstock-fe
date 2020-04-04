import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StockList from './common/stock-list';

import { BASE_API_URL } from '../constants';

function MostActive() {
  const [mostActive, setMostActive] = useState([]);

  useEffect(() => {
    const url = `${BASE_API_URL}/api/stocks/market/list/mostactive`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setMostActive(res.data);
      })
      .catch((err) => {
        // TODO: handle errors
        console.error(err);
      });
  }, []);

  return (
    <Section>
      <div className="section-title">
        <span>Most Active</span>
      </div>
      <StockList stockList={mostActive} displayLength={5} />
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 2rem;
`;

export default MostActive;
