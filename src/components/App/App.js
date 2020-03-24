import React, { StrictMode } from 'react';
import { Route } from 'react-router-dom';
import GlobalStyle from '../../global-styles';

const Home = () => <h1>Hello, world!</h1>;
const LogIn = () => <h1>Login</h1>;
const Register = () => <h1>Register</h1>;

function App() {
  return (
    <StrictMode>
      <div className="app">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/" component={Home} />
      </div>
      <GlobalStyle />
    </StrictMode>
  );
}

export default App;
