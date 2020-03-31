import React from 'react';
import styled from 'styled-components';
import WatchlistButton from './watchlist-button';

function StockQuote({ quote }) {
  return !quote ? null : (
    <QuoteWrapper>
      <div className="data-header">
        <div
          className={
            quote.changePercent > 0
              ? 'green data-header__left'
              : 'red data-header__left'
          }
        >
          <h1 className="symbol">{quote.symbol}</h1>
          <h2 className="company-name">{quote.companyName}</h2>
          <div className="price-wrapper">
            <span className="price">
              ${Number(quote.latestPrice).toFixed(2)}
            </span>
            {quote.changePercent > 0 ? <ArrowUp /> : <ArrowDown />}
          </div>
          <span className="change">{Number(quote.change).toFixed(2)}</span>
          <span className="change-percent">
            ({Number(quote.changePercent * 100).toFixed(2) + '%'})
          </span>
          <div className="latest-trading-day">
            Data as of {quote.latestTime}
          </div>
        </div>
        <div className="data-header__right">
          <img
            className="logo"
            src={`https://storage.googleapis.com/iex/api/logos/${quote.symbol}.png`}
            alt={`${quote.name} Logo`}
          />
          <WatchlistButton />
        </div>
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
  }

  .data-header__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
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

  .price-wrapper {
    display: flex;
    align-items: center;
  }

  .price {
    font-size: 1.6rem;
    line-height: 1.6rem;
    margin-right: 0.75rem;
  }

  .green .change,
  .green .change-percent {
    color: ${(props) => props.theme.colors.gain};
  }

  .red .change,
  .red .change-percent {
    color: ${(props) => props.theme.colors.loss};
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

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 16px solid ${(props) => props.theme.colors.gain};
`;

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-top: 16px solid ${(props) => props.theme.colors.loss};
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
`;

export default StockQuote;
