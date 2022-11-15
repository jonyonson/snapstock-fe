import React, { useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';

import { BeatLoader } from 'react-spinners';
import AuthWrapper from '../styles/auth.styled';
import Alert from '../components/Alert';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/use-auth';
import { PATHS } from '../config/constants';
import axios from 'axios';

function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = credentials;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem('user', user);
        axios
          .post(PATHS.AUTH.LOGIN, { email, password })
          .then((res) => {
            setError(null);
            history.push(PATHS.ROUTES.HOME);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err.response.data);
          });
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <Layout>
      <AuthWrapper>
        <h1>Sign In</h1>
        {location.state && location.state.referrer === 'watchlist' && (
          <Alert severity="info">
            You must be signed in in order to save securities to your watchlist.
            Log in below or{' '}
            <Link to={PATHS.ROUTES.SIGN_UP}>create an account</Link>.
          </Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}
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
          <Link to={PATHS.ROUTES.RESET_PASSWORD} className="forgot-password">
            Forgot Password?
          </Link>
          <button type="submit">
            {loading ? <BeatLoader size={12} color="#fff" /> : 'Sign In'}
          </button>
        </form>
        <div className="link-text">
          <span>Don't have an account?</span>
          <Link to={PATHS.ROUTES.SIGN_UP}>Sign up</Link>
        </div>
      </AuthWrapper>
    </Layout>
  );
}

export default SignIn;
