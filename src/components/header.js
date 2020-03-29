import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <StyledHeader>
      <div className="container">
        <h1>Snapstock</h1>
      </div>
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

  .container {
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
  }
`;

export default Header;
