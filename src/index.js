import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import App from './components/app';
import GlobalStyle from './styles/global-styles';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import Watchlist from './components/watchlist';
import 'sanitize.css/sanitize.css';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <div className="app">
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/" component={App} />
          <Route path="/stocks/:symbol" component={App} />
          <Route path="/watchlist" component={Watchlist} />
        </Switch>
      </div>
      <GlobalStyle />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
