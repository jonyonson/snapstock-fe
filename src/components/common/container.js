import React from 'react';
import styled from 'styled-components';

function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 415px) {
    padding: 0 1.5rem;
  }
`;

export default Container;
