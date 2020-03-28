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
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;

  h1 {
    font-size: 1.5rem;
    margin: 0;
    color: #fff;
  }
`;

export default Header;
