import React from 'react';
import styled from 'styled-components';
import Header from '../header';
import Container from './container';

function AppWrapper({ children }) {
  return (
    <StyledWrapper>
      <div>
        <Header />
        {children}
      </div>

      <StyledFooter>
        <Container>
          <div className="footer">
            <div>
              <a
                href="https://www.freeprivacypolicy.com/privacy/view/c6ca6de4535056aa3ab9331aa2f12158"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </div>
            <div>
              <span>
                Market data provided by{' '}
                <a href="https://iexcloud.io">IEX Cloud</a>
              </span>
            </div>
          </div>
        </Container>
      </StyledFooter>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 1.5rem 0;
  margin-top: 2rem;
  font-size: 0.8125rem;

  .footer {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;

    @media (min-width: 415px) {
      flex-direction: row;
    }
  }

  @media (min-width: 415px) {
    font-size: 0.9375rem;
  }

  a {
    color: white;
  }

  span a {
    border-bottom: 1px solid white;
  }
`;

export default AppWrapper;
