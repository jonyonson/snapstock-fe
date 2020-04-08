import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaCheck } from 'react-icons/fa';

function WatchlistButton({ followStock, isFollowing }) {
  return (
    <StyledButton onClick={followStock}>
      {isFollowing ? <FaCheck /> : <FaPlus />}

      <span className="button-text">
        {isFollowing ? 'Following' : 'Follow'}
      </span>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  text-transform: uppercase;
  background-color: #fff;
  /* border: 2px solid ${(props) => props.theme.colors.secondary}; */
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  /* padding: 10px; */
  font-size: 0.875rem;
  padding-left: 0;

  .button-text {
    font-weight: bold;
    margin-left: 5px;
  }
`;

export default WatchlistButton;
