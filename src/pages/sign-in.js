import React, { useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import AuthWrapper from '../styles/auth.styled';
import Alert from '../components/common/alert';
import AppWrapper from '../components/common/app-wrapper';

import { BASE_API_URL } from '../constants';

function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${BASE_API_URL}/auth/login`, credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        history.push('/');
      })
      .catch((err) => {
        setLoading(false);
        // TODO: handle errors
        console.log(err.response);
      });
  };

  return (
    <AppWrapper>
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
          <button type="submit">
            {loading ? <BeatLoader size={12} color="#fff" /> : 'Sign In'}
          </button>
        </form>
        <div className="link-text">
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up</Link>
        </div>
      </AuthWrapper>
    </AppWrapper>
  );
}

export default SignIn;
