import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import StockList from './common/stock-list';

import { BASE_API_URL } from '../constants';

function BiggestLosers() {
  const [biggestGainers, setBiggestGainers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const handleError = (e: AxiosError) => {
    console.error(e);
    setError('Error fetching data.');
  };

  useEffect(() => {
    axios
      .get(BASE_API_URL + '/api/stocks/market/list/gainers')
      .then((res) => setBiggestGainers(res.data))
      .catch((err: AxiosError) => handleError(err));
  }, []);

  return (
    <Section>
      <div className="section-title">
        <span>Biggest Gainers</span>
      </div>
      <StockList stockList={biggestGainers} displayLength={5} />
      {error && <Error>{error}</Error>}
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Error = styled.p`
  color: red;
  margin-top: 1rem;
  font-size: 90%;
`;

export default BiggestLosers;
