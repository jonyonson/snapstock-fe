import React, { useState, Fragment } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import AuthWrapper from '../styles/auth.styled';
import Header from '../components/header';
import Alert from '../components/ui/alert';

import { BASE_API_URL } from '../constants';

function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const history = useHistory();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);

    axios
      .post(`${BASE_API_URL}/auth/login`, credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.id);
        history.push('/');
      })
      .catch((err) => {
        // TODO: handle errors
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Header />
      <AuthWrapper>
        <h1>Sign In</h1>
        {location.state && location.state.referrer === 'watchlist' && (
          <Alert>
            You must be signed in in order to save securities to your watchlist.
            Log in below or <Link to="/signup">create an account.</Link>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange}
            value={credentials.email}
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={credentials.password}
          />
          <button type="submit">Sign In</button>
        </form>
        <div className="link-text">
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up</Link>
        </div>
      </AuthWrapper>
    </Fragment>
  );
}

export default SignIn;
