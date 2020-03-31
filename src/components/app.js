import React, { useState, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from './home';
import SignIn from './sign-in';
import SignUp from './sign-up';
import Watchlist from './watchlist';
import GlobalStyle from '../styles/global-styles';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  return (
    <Fragment>
      <Route
        exact
        path="/"
        render={(props) => (
          <Home {...props} setWatchlist={setWatchlist} watchlist={watchlist} />
        )}
      />

      <Route
        path="/stocks/:symbol"
        render={(props) => (
          <Home {...props} setWatchlist={setWatchlist} watchlist={watchlist} />
        )}
      />

      <Route
        path="/watchlist"
        render={(props) => (
          <Watchlist
            {...props}
            setWatchlist={setWatchlist}
            watchlist={watchlist}
          />
        )}
      />

      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
