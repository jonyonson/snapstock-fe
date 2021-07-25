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

function App() {
  return (
    <ProvideAuth>
      <Route exact path="/" component={Home} />
      <Route path="/watchlist" component={Watchlist} />
      <Route path="/stocks/:symbol" component={SymbolPage} />
      <Route path="/accounts/signup" component={SignUp} />
      <Route path="/accounts/signin" component={SignIn} />
      <Route path="/accounts/password" component={PasswordReset} />
      <GlobalStyle />
    </ProvideAuth>
  );
}

export default App;
