import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import formatNumber from '../utils/formatNumber';
// import theme from '../styles/theme';
// import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

import { BASE_API_URL } from '../constants';

function Widget({ name, index }) {
  return (
    <StyledWidget index={index}>
      <div className="top">
        <div>{name}</div>
        <div className="change">
          {index ? formatNumber(index.change, null, true) : '--'}
        </div>
      </div>

      <div className="bottom">
        <div className="percent-change">
          {/* {index ? (
            index.percentChange >= 0 ? (
              <MdArrowDropUp size={22} color={theme.colors.gain} />
            ) : (
              <MdArrowDropDown size={22} color={theme.colors.loss} />
            )
          ) : null} */}
          <span>
            {index ? formatNumber(index.percentChange, '%', true) : '--'}
          </span>
        </div>

        <div className="price">{index ? formatNumber(index.price) : '--'}</div>
      </div>
    </StyledWidget>
  );
}

const StyledWidget = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  padding: 0.4rem;
  font-size: 0.6875rem;
  font-weight: 700;
  color: white;
  border: 2px solid transparent;
  transition: background-color 0.3s ease-in;

  @media (min-width: 375px) {
    width: 33%;
  }

  &:nth-of-type(1) {
    margin-right: 0.25rem;
  }

  &:nth-of-type(2) {
    margin-left: 0.25rem;
    @media (min-width: 375px) {
      margin-right: 0.25rem;
    }
  }

  &:nth-of-type(3) {
    display: none;
    @media (min-width: 375px) {
      display: flex;
      margin-left: 0.25rem;
    }
  }

  color: ${(props) =>
    props.index !== null ? props.theme.colors.white : props.theme.colors.black};

  background-color: ${(props) =>
    props.index !== null
      ? props.index.percentChange >= 0
        ? props.theme.colors.gain
        : props.theme.colors.loss
      : 'rgba(0,0,0,0.2)'};

  /* border: 2px solid
    ${(props) =>
      props.index !== null
        ? props.index.percentChange >= 0
          ? props.theme.colors.gain
          : props.theme.colors.loss
        : props.theme.colors.black}; */

  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .top {
    margin-bottom: 5px;
  }
`;

function Indices() {
  const [dow, setDow] = useState(null);
  const [sp500, setSp500] = useState(null);
  const [nasdaq, setNasdaq] = useState(null);

  const fetchData = () => {
    const url = `${BASE_API_URL}/api/stocks/market/indices`;

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        const { nasdaq, sp500, dow } = res.data;
        setDow(dow);
        setNasdaq(nasdaq);
        setSp500(sp500);
      })
      .catch((err) => {
        // TODO: handle errors
        console.error(err);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Fetching index data every 15 seconds...');
      fetchData();
    }, 15000);

    fetchData();
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledContainer>
      <Widget name="DOW 30" index={dow} />
      <Widget name="NASDAQ" index={nasdaq} />
      <Widget name="S&P 500" index={sp500} />
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  @media (min-width: 770px) {
    margin: 0 0 1rem;
  }
`;

export default Indices;
