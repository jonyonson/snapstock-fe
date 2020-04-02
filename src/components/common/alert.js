import React from 'react';
import styled from 'styled-components';

function Alert({ children }) {
  return <StyledAlert>{children}</StyledAlert>;
}

const StyledAlert = styled.div`
  background-color: ${(props) => props.theme.colors.info};
  border: 1px solid ${(props) => props.theme.colors.infoBorder};
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 2px;
  padding: 0.5rem 0.9375rem;

  a {
    font-weight: bold;
  }
`;

export default Alert;
