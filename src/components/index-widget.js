import React from 'react';
import styled from 'styled-components';
import format from '../utils/format-number';

const Widget = ({ name, index }) => {
  const options = { change: true };
  const change = index ? format(index.change, options) : '--';
  const percentChange = index ? format(index.percentChange, options) : '--';
  const price = index ? format(index.price) : '--';

  return (
    <StyledWidget index={index} name={name}>
      <div className="top">
        <div>{name}</div>
        <div className="change">{change}</div>
      </div>
      <div className="bottom">
        <div className="percent-change">
          <span>{percentChange}</span>
        </div>
        <div className="price">{price}</div>
      </div>
    </StyledWidget>
  );
};

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

export default Widget;
