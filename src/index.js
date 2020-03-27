import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'sanitize.css/sanitize.css';
import App from './components/app';
import GlobalStyle from './styles/global-styles';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
// import Protected from './components/Protected';

ReactDOM.render(
  <BrowserRouter>
    <div className="app">
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/" component={App} />
        {/* <Protected exact path="/" component={App} /> */}
      </Switch>
    </div>
    <GlobalStyle />
  </BrowserRouter>,
  document.getElementById('root'),
);