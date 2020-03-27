import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <StyledHeader>
      <h1>Snapstock</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  padding: 1rem;
  background-color: #12939a;
  color: #fff;

  h1 {
    font-size: 1.5rem;
    margin: 0;
    color: #fff;
  }
`;

export default Header;
