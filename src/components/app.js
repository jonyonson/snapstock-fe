import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from './home';
import SignIn from './sign-in';
import SignUp from './sign-up';
import Watchlist from './watchlist';
import GlobalStyle from '../styles/global-styles';

function App() {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/watchlist" component={Watchlist} />
      <Route path="/stocks/:symbol" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
