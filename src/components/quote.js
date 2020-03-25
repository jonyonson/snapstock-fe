import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function Quote({ selection }) {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (selection !== null) {
      const { symbol } = selection;
      // const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
      const url = `http://localhost:5000/api/stocks/${symbol}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setQuote({ name: selection.name, ...res.data });
        })
        .catch((err) => console.log(err));
    }
  }, [selection]);

  return quote === null ? null : (
    <QuoteWrapper>
      <div className="data-header">
        <div>
          <h1 className="symbol">{quote.symbol}</h1>
          <h2 className="company-name">{quote.name}</h2>
          <div className="price">{quote.price}</div>
          <span className="change">{quote.change}</span>
          <span className="change-percent">{quote.change_percent}</span>
          <div className="latest-trading-day">
            Data as of {quote.latest_trading_day}
          </div>
        </div>
        <img className="logo" src={quote.logo_url} alt={`${quote.name} Logo`} />
      </div>

      <div className="data-table">
        <div>
          <span>Open</span>
          <span>{quote.open}</span>
        </div>
        <div>
          <span>Previous Close</span>
          <span>{quote.previous_close}</span>
        </div>
        <div>
          <span>Day High</span>
          <span>{quote.high}</span>
        </div>
        <div>
          <span>Day Low</span>
          <span>{quote.low}</span>
        </div>
        <div>
          <span>Volume</span>
          <span>{quote.volume}</span>
        </div>
      </div>
    </QuoteWrapper>
  );
}

const QuoteWrapper = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
  .data-header {
    display: flex;
    justify-content: space-between;
  }

  .logo {
    height: 60px;
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
    opacity: 0.65;
  }

  .data-table {
    margin-top: 2rem;

    div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default Quote;
