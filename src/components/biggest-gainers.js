import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StockList from './stock-list';
import { PATHS } from '../config/constants';

function BiggestLosers() {
  const [biggestGainers, setBiggestGainers] = useState([]);
  const [error, setError] = useState(null);

  const handleError = (e) => {
    console.error(e);
    setError('Error fetching data.');
  };

  useEffect(() => {
    axios
      .get(PATHS.API.GAINERS)
      .then((res) => setBiggestGainers(res.data))
      .catch((err) => handleError(err));
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
