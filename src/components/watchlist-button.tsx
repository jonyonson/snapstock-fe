import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaCheck } from 'react-icons/fa';

interface Props {
  followStock: () => void;
  isFollowing: boolean;
}

const WatchlistButton = ({ followStock, isFollowing }: Props) => (
  <StyledButton onClick={followStock}>
    {isFollowing ? <FaCheck /> : <FaPlus />}
    <span className="button-text">{isFollowing ? 'Following' : 'Follow'}</span>
  </StyledButton>
);

const StyledButton = styled.button`
  text-transform: uppercase;
  background-color: #fff;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding-left: 0;
  padding-bottom: 0;
  outline: none;

  .button-text {
    font-weight: bold;
    margin-left: 5px;
  }
`;

export default WatchlistButton;
