import React from 'react';
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';

function SearchButton({ setShowSearch }) {
  const handleClick = () => {
    setShowSearch(true);
  };

  return (
    <StyledButton className="search-button" onClick={handleClick}>
      <GoSearch />
      <span>Search Quotes</span>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  border: none;
  font-size: 18px;
  padding: 0.5rem;
  outline: none;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.4);

  span {
    margin-left: 1rem;
    text-transform: uppercase;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.4);
    letter-spacing: 1px;
    font-size: 0.9375rem;
  }
`;

export default SearchButton;
