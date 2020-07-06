import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';
import Container from './container';
import logo from '../assets/snapstock_logo.svg';

type FixMeLater = any;
type Props = {
  setWatchlist?: React.Dispatch<React.SetStateAction<FixMeLater[] | null>>;
};

const Header = ({ setWatchlist }: Props) => {
  const history = useHistory();

  const logout = () => {
    handleReset();
    localStorage.removeItem('token');
    history.push('/');
  };

  const handleReset = () => {
    setWatchlist && setWatchlist(null);
  };

  return (
    <StyledHeader>
      <Container>
        <div className="header__inner">
          <Link className="logo" to="/" onClick={() => handleReset()}>
            <img src={String(logo)} alt="" />
          </Link>
          <div>
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
};

const StyledHeader = styled.div`
  /* background-color: ${(props) => props.theme.colors.primary}; */
  /* border-bottom: 1px solid rgba(0,0,0,0.2); */
  background-color: white;

  .header__inner {
    padding: 1.2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 500px) {
        padding: 1.4rem 0;
      }
  }

  a {
    text-decoration: none;
  }

  .logo {
    color: ${(props) => props.theme.colors.headerText};
    font-size: 1.5rem;
    font-weight: 500;

    img {
      height: 25px;

      @media (min-width: 375px) {
        height: 30px;
      }

      @media (min-width: 500px) {
        height: 40px;
      }
    }
  }

  .logout {
    outline: none;
    padding-right: 0;
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
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-left: 0.5rem;
    font-weight: 700;
    letter-spacing: 1px;

    @media (max-width: 375px) {
      font-size: .6875rem;
    }

    &:hover {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;

export default Header;
