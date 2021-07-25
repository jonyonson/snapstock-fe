import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StockList from './stock-list';

import { PATHS } from '../config/constants';

function MostActive() {
  const [mostActive, setMostActive] = useState([]);
  const [error, setError] = useState(null);

  const handleError = (e) => {
    console.error(e);
    setError('Error fetching data.');
  };

  useEffect(() => {
    axios
      .get(PATHS.API.MOST_ACTIVE)
      .then((res) => setMostActive(res.data))
      .catch((err) => handleError(err));
  }, []);

  return (
    <Section>
      <div className="section-title">
        <span>Most Active</span>
      </div>
      <StockList stockList={mostActive} displayLength={5} />
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

export default MostActive;
