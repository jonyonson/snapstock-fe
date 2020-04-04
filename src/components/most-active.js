import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { BASE_API_URL } from '../constants';

function MostActive() {
  const [mostActive, setMostActive] = useState([]);

  useEffect(() => {
    const mostActiveURL = `${BASE_API_URL}/api/stocks/market/list/mostactive`;
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
      <div className="section-title">Most Active</div>
      <StyledList>
        <div className="row">
          <div>Name</div>
          <div>Price</div>
          <div>Change</div>
          <div>% Change</div>
          <div>Volume</div>
        </div>
        {mostActive.length > 0 &&
          mostActive.map((stock) => {
            return (
              <div key={stock.symbol} className="row">
                <div>{stock.symbol}</div>
                <div>{stock.latestPrice}</div>
                <div>{stock.change}</div>
                <div>{stock.changePercent}</div>
                <div>{stock.volume}</div>
              </div>
            );
          })}
      </StyledList>
    </Fragment>
  );
}

const StyledList = styled.div`
  .row {
    display: flex;

    div {
      border: 1px solid black;
      min-width: 100px;
    }
  }
`;

export default MostActive;
