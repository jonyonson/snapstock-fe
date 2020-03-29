import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <Fragment>
      <StyledHeader>
        <div className="container">
          <Link className="logo" to="/">
            Snapstock
          </Link>
          <Link className="login" to="/signin">
            Log in
          </Link>
        </div>
      </StyledHeader>
    </Fragment>
  );
}

const StyledHeader = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.primary};

  h1 {
    font-size: 1.5rem;
    margin: 0;
    color: #fff;
  }

  .container {
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
  }

  .logo {
    color: ${(props) => props.theme.colors.headerText};
    font-size: 1.5rem;
    font-weight: 500;
  }

  .login {
    color: ${(props) => props.theme.colors.headerText};
    text-transform: uppercase;
  }
`;

export default Header;
