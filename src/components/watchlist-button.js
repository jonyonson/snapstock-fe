import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

function WatchlistButton() {
  return (
    <StyledButton onClick={() => console.log('add to watchlist')}>
      <FaPlus />
      <span className="button-text">Add to Watchlist</span>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  text-transform: uppercase;
  background-color: #fff;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;

  .button-text {
    font-weight: bold;
    margin-left: 5px;
  }
`;

export default WatchlistButton;
