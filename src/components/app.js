import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/home';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up.js';
import PasswordReset from '../pages/password-reset';
import Watchlist from '../pages/watchlist';
import GlobalStyle from '../styles/global-styles';
import SymbolPage from '../pages/symbol';
import { ProvideAuth } from '../hooks/use-auth';
import { PATHS } from '../constants';

function App() {
  return (
    <ProvideAuth>
      <Route exact path={PATHS.HOME} component={Home} />
      <Route path={PATHS.WATCHLIST} component={Watchlist} />
      <Route path="/stocks/:symbol" component={SymbolPage} />
      <Route path={PATHS.SIGN_UP} component={SignUp} />
      <Route path={PATHS.SIGN_IN} component={SignIn} />
      <Route path={PATHS.RESET_PASSWORD} component={PasswordReset} />
      <GlobalStyle />
    </ProvideAuth>
  );
}

export default App;
