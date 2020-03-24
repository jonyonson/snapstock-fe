import React, { StrictMode } from 'react';
import { Route } from 'react-router-dom';
import GlobalStyle from '../../styles/global-styles';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Protected from '../Protected';

const Home = () => <h1>Hello, world!</h1>;

function App() {
  return (
    <StrictMode>
      <div className="app">
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Protected exact path="/" component={Home} />
      </div>
      <GlobalStyle />
    </StrictMode>
  );
}

export default App;
