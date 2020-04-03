import React from 'react';
import styled, { useTheme } from 'styled-components';

function StockWidget({ stock }) {
  const green = useTheme().colors.gain;
  const red = useTheme().colors.loss;
  const color = stock.change >= 0 ? green : red;

  return (
    <Widget color={color}>
      <span>{stock.symbol}</span>
    </Widget>
  );
}

const Widget = styled.div`
  background-color: ${(props) => props.color};
  height: 50px;
  width: 150px;
  font-size: 13px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.white};
  padding: 5px;
  margin-bottom: 0.5rem;
`;

export default StockWidget;
