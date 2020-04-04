import React from 'react';
import styled from 'styled-components';

function KeyData({ quote }) {
  return !quote ? null : (
    <Styled>
      <div className="section-title">Key Data</div>
      <div className="table">
        <div>
          <span>Open</span>
          <span>{Number(quote.open).toFixed(2)}</span>
        </div>
        <div>
          <span>Previous Close</span>
          <span>{Number(quote.previousClose).toFixed(2)}</span>
        </div>
        <div>
          <span>Day High</span>
          <span>{Number(quote.high).toFixed(2)}</span>
        </div>
        <div>
          <span>Day Low</span>
          <span>{Number(quote.low).toFixed(2)}</span>
        </div>
        <div>
          <span>Volume</span>
          <span>{Number(quote.volume).toLocaleString()}</span>
        </div>
      </div>
    </Styled>
  );
}

const Styled = styled.div`
  margin-top: 2rem;

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
