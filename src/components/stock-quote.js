import React from 'react';
import styled from 'styled-components';

function StockQuote({ quote, logoURL }) {
  return quote === null ? null : (
    <QuoteWrapper>
      <div className="data-header">
        <div className={quote.changePercent > 0 ? 'green' : 'red'}>
          <h1 className="symbol">{quote.symbol}</h1>
          <h2 className="company-name test">{quote.companyName}</h2>
          <div className="price">${Number(quote.latestPrice).toFixed(2)}</div>
          <span className="change">{Number(quote.change).toFixed(2)}</span>
          <span className="change-percent">
            ({Number(quote.changePercent * 100).toFixed(2) + '%'})
          </span>
          <div className="latest-trading-day">
            Data as of {quote.latestTime}
          </div>
        </div>
        <img className="logo" src={logoURL} alt={`${quote.name} Logo`} />
      </div>

      <div className="data-table">
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
    </QuoteWrapper>
  );
}

const QuoteWrapper = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
  position: relative;

  .data-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .logo {
    margin-top: 5px;
    max-height: 60px;
  }

  .symbol {
    font-size: 2.5rem;
    font-weight: 300;
    margin: 0;
  }

  .company-name {
    font-size: 1.1rem;
    font-weight: 900;
    margin: 0;
  }

  .price {
    font-size: 1.5rem;
  }

  .green .change,
  .green .change-percent {
    color: green;
  }

  .red .change,
  .red .change-percent {
    color: red;
  }

  .change {
    margin-right: 5px;
    font-size: 1.1rem;
  }
  .change-percent {
    font-size: 1.1rem;
  }

  .latest-trading-day {
    font-size: 0.5rem;
    text-transform: uppercase;
    font-weight: 900;
  }

  .data-table {
    margin-top: 2rem;

    div {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid black;
      padding-bottom: 0.15rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export default StockQuote;
