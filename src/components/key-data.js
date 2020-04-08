import React, { useState } from 'react';
import styled from 'styled-components';
import formatNumber from '../utils/formatNumber';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';

function KeyData({ quote }) {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return !quote ? null : (
    <Section>
      <div className="section-title">
        <span>Key Data</span>
        {isVisible ? (
          <AiOutlineMinusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
            size={20}
          />
        ) : (
          <AiOutlinePlusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
            size={20}
          />
        )}
      </div>
      {isVisible && (
        <div className="table">
          <div>
            <span>Open</span>
            <span>{formatNumber(quote.open)}</span>
          </div>
          <div>
            <span>Previous Close</span>
            <span>{formatNumber(quote.previousClose)}</span>
          </div>
          <div>
            <span>Day High</span>
            <span>{formatNumber(quote.high)}</span>
          </div>
          <div>
            <span>Day Low</span>
            <span>{formatNumber(quote.low)}</span>
          </div>
          <div>
            <span>Volume</span>
            <span>{formatNumber(quote.volume)}</span>
          </div>
        </div>
      )}
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 2rem;

  .table {
    font-size: 0.875rem;

    @media (min-width: 500px) {
      font-size: 0.9375rem;
    }

    div {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 0.15rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export default KeyData;
