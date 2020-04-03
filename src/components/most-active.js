import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StockWidget from './stock-widget';

import { BASE_API_URL } from '../constants';

function MostActive() {
  const [mostActive, setMostActive] = useState([]);

  useEffect(() => {
    const mostActiveURL = `${BASE_API_URL}/api/stocks/market/list/mostactive`;
    console.log('fetching');
    axios
      .get(mostActiveURL)
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
    <Fragment>
      <h1>Most Active</h1>
      <StyledList>
        {mostActive.length > 0 &&
          mostActive.map((stock) => {
            return (
              <Link
                key={stock.symbol}
                to={`/stocks/${stock.symbol.toLowerCase()}`}
              >
                <StockWidget stock={stock} />
              </Link>
            );
          })}
      </StyledList>
    </Fragment>
  );
}

const StyledList = styled.div``;

export default MostActive;

// return (
//   <div key={stock.symbol}>
//     <p>{stock.companyName}</p>
//     <p>{stock.symbol}</p>
//     <p>{stock.latestPrice}</p>
//     <p>{stock.change}</p>
//     <p>{stock.changePercent}</p>
//     <p>{stock.volume}</p>
//   </div>
