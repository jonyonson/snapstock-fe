import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaCheck } from 'react-icons/fa';

function WatchlistButton({ addToWatchlist, isWatchlisted }) {
  return (
    <StyledButton onClick={addToWatchlist}>
      {isWatchlisted ? <FaCheck /> : <FaPlus />}

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
