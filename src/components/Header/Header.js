import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Container from '../Layout/Container';
import logo from '../../assets/snapstock_logo.svg';
import { useAuth } from '../../hooks/use-auth';
import { PATHS } from '../../config/constants';
import './Header.scss';

const Header = ({ setWatchlist }) => {
  const history = useHistory();
  const auth = useAuth();

  const logout = () => {
    handleReset();
    auth.signout();
    history.push(PATHS.ROUTES.HOME);
  };

  const handleReset = () => {
    setWatchlist && setWatchlist(null);
  };

  const isAuthenticated = localStorage.getItem('user');

  return (
    <div className="Header">
      <Container>
        <div className="Header__container">
          <Link className="Header__logo" to="/" onClick={() => handleReset()}>
            <img src={String(logo)} alt="Snapstock Logo" />
          </Link>
          <div>
            <Link
              className="Header__navigation-item"
              to={PATHS.ROUTES.WATCHLIST}
            >
              Watchlist
            </Link>
            {isAuthenticated ? (
              <button className="Header__navigation-item" onClick={logout}>
                Sign out
              </button>
            ) : (
              <Link
                className="Header__navigation-item"
                to={PATHS.ROUTES.SIGN_IN}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
