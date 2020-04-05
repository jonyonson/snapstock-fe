import React from 'react';
import styled from 'styled-components';
import { useHistory, useLocation, Link } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';
import { FaSearch } from 'react-icons/fa';
import Container from './common/container';

import { ROUTES } from '../constants';

function Header({ setSymbol, setQuote, setWatchlist, setShowSearch }) {
  const history = useHistory();
  const location = useLocation();

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

  const findSymbol = () => {
    // If we are not in the <Home/> component, we need to push to '/'...
    // ... and pass some state letting the <Home/> component know...
    // ...to set showSearchBar to true. If we are Home, set showSearch to true
    if (ROUTES.includes(location.pathname)) {
      history.push({
        pathname: '/',
        state: { previousPath: location.pathname },
      });
    } else {
      setShowSearch(true);
    }
  };

  return (
    <StyledHeader>
      <Container>
        <div className="header__inner">
          <Link className="logo" to="/" onClick={() => handleReset()}>
            Snapstock
          </Link>
          <div>
            {location.pathname !== '/' && (
              <button className="search-button" onClick={findSymbol}>
                <FaSearch size="18" />
              </button>
            )}
            <Link className="nav-item" to="/watchlist">
              Watchlist
            </Link>
            {!isAuthenticated() ? (
              <Link className="nav-item login" to="/signin">
                Sign in
              </Link>
            ) : (
              <button className="nav-item logout" onClick={logout}>
                Sign out
              </button>
            )}
          </div>
        </div>
      </Container>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: ${(props) => props.theme.colors.primary};

  .header__inner {
    padding: 1rem 0;
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

  .logout {
    outline: none;
  }

  button {
    background: transparent;
    border: none;
  }

  .search-button {
    padding: 0.5rem;
    border-radius: 3px;
    outline: none;

    span {
      margin-left: 10px;
    }
  }

  .search-button,
  .nav-item {
    color: ${(props) => props.theme.colors.headerText};
    text-transform: uppercase;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-left: 0.5rem;
  }
`;

export default Header;
