import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/home';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up.js';
import PasswordReset from '../pages/reset-password';
import Watchlist from '../pages/watchlist';
import SymbolPage from '../pages/symbol';
import Profile from '../pages/profile';
import { ProvideAuth } from '../hooks/use-auth';
import { PATHS } from '../config/constants';
import ForgotPassword from '../pages/forgot-password';

function App() {
  return (
    <ProvideAuth>
      <Route exact path={PATHS.ROUTES.HOME} component={Home} />
      <Route path={PATHS.ROUTES.WATCHLIST} component={Watchlist} />
      <Route path={PATHS.ROUTES.SYMBOL} component={SymbolPage} />
      <Route path={PATHS.ROUTES.SIGN_UP} component={SignUp} />
      <Route path={PATHS.ROUTES.SIGN_IN} component={SignIn} />
      <Route path={PATHS.ROUTES.RESET_PASSWORD} component={PasswordReset} />
      <Route path={PATHS.ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
      <Route path={PATHS.ROUTES.PROFILE} component={Profile} />
    </ProvideAuth>
  );
}

export default App;
