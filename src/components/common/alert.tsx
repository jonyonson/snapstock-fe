import React from 'react';
import styled from 'styled-components';

interface AlertProps {
  readonly type: string;
}

const Alert: React.FC<AlertProps> = ({ type, children }) => {
  return <StyledAlert type={type}>{children}</StyledAlert>;
};

const StyledAlert = styled.div<AlertProps>`
  width: 100%;
  color: ${(props) => {
    if (props.type === 'info') {
      return props.theme.colors.infoText;
    } else if (props.type === 'error') {
      return props.theme.colors.errorText;
    }
  }};

  background-color: ${(props) => {
    if (props.type === 'info') {
      return props.theme.colors.infoBackground;
    } else if (props.type === 'error') {
      return props.theme.colors.errorBackground;
    }
  }};

  border: 1px solid
    ${(props) => {
      if (props.type === 'info') {
        return props.theme.colors.infoBorder;
      } else if (props.type === 'error') {
        return props.theme.colors.errorBorder;
      }
    }};

  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 2px;
  padding: 0.5rem 0.9375rem;

  &:not(:first-of-type) {
    margin-top: 1rem;
  }

  a {
    font-weight: bold;
    color: inherit;
  }
`;

export default Alert;
