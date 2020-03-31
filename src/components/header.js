import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';

function Header({ setSymbol, setQuote, setWatchlist }) {
  const history = useHistory();

  const logout = () => {
    handleReset();
    localStorage.removeItem('token');
    history.push('/');
  };

  const handleReset = () => {
    setSymbol && setSymbol(null);
    setQuote && setQuote(null);
    setWatchlist && setWatchlist(null);
  };

  return (
    <Fragment>
      <StyledHeader>
        <div className="container">
          <Link className="logo" to="/" onClick={() => handleReset()}>
            Snapstock
          </Link>

          <div>
            <Link className="nav-item" to="/watchlist">
              Watchlist
            </Link>
            {!localStorage.getItem('token') ? (
              <Link className="nav-item login" to="/signin">
                Log in
              </Link>
            ) : (
              <button className="nav-item logout" onClick={logout}>
                Log out
              </button>
            )}
          </div>
        </div>
      </StyledHeader>
    </Fragment>
  );
}

const StyledHeader = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.primary};

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
  }

  .logout {
    background: transparent;
    border: none;
    padding: 0;
  }

  .nav-item {
    color: ${(props) => props.theme.colors.headerText};
    text-transform: uppercase;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-left: 0.5rem;
  }
`;

export default Header;
