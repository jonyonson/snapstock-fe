import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import formatNumber from '../utils/formatNumber';
import { BASE_API_URL } from '../constants';

interface Index {
  change: number;
  percentChange: number;
  price: number;
}

interface Props {
  name: 'DOW' | 'NASDAQ' | 'S&P 500';
  index: Index | null;
}

const Widget = ({ name, index }: Props) => {
  return (
    <StyledWidget index={index} name={name}>
      <div className="top">
        <div>{name}</div>
        <div className="change">
          {index ? formatNumber(index.change, { change: true }) : '--'}
        </div>
      </div>

      <div className="bottom">
        <div className="percent-change">
          <span>
            {index ? formatNumber(index.percentChange, { change: true }) : '--'}
          </span>
        </div>

        <div className="price">{index ? formatNumber(index.price) : '--'}</div>
      </div>
    </StyledWidget>
  );
};

export default function MarketIndices() {
  const [dow, setDow] = useState(null);
  const [sp500, setSp500] = useState(null);
  const [nasdaq, setNasdaq] = useState(null);

  const fetchData = () => {
    axios
      .get(BASE_API_URL + '/api/stocks/market/indices')
      .then((res) => {
        const { nasdaq, sp500, dow } = res.data;
        setDow(dow);
        setNasdaq(nasdaq);
        setSp500(sp500);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 15000);

    fetchData();
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledContainer>
      <Widget name="DOW" index={dow} />
      <Widget name="NASDAQ" index={nasdaq} />
      <Widget name="S&P 500" index={sp500} />
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledWidget = styled.div<Props>`
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
    font-size: 0.625rem;
    padding: 0.2rem;
  }

  @media (min-width: 400px) {
    font-size: 0.6875rem;
    padding: 0.4rem;
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
