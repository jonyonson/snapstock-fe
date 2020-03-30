import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';

function Header({ setSelection, setQuote }) {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  const handleReset = () => {
    if (setSelection) {
      setSelection(null);
      setQuote(null);
    }
  };

  return (
    <Fragment>
      <StyledHeader>
        <div className="container">
          <Link className="logo" to="/" onClick={() => handleReset()}>
            Snapstock
          </Link>

          {!localStorage.getItem('token') ? (
            <Link className="login" to="/signin">
              Log in
            </Link>
          ) : (
            <button className="logout" onClick={logout}>
              Log out
            </button>
          )}
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

  .login,
  .logout {
    color: ${(props) => props.theme.colors.headerText};
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .logout {
    background: transparent;
    border: none;
    padding: 0;
  }
`;

export default Header;
