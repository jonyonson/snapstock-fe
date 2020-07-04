import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from '../containers/home';
import SignIn from '../containers/sign-in';
import SignUp from '../containers/sign-up';
import Watchlist from '../containers/watchlist';
import GlobalStyle from '../styles/global-styles';
import MostActive from './most-active';
import SymbolPage from '../containers/symbol';

function App() {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/watchlist" component={Watchlist} />
      <Route path="/stocks/:symbol" component={SymbolPage} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/active" component={MostActive} />
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
