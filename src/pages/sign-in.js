import React, { useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';

import { BeatLoader } from 'react-spinners';
import AuthWrapper from '../styles/auth.styled';
import Alert from '../components/Alert';
import AppWrapper from '../components/app-wrapper';
import { useAuth } from '../hooks/use-auth';

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

  // const signInWithGoogle = () => {
  //   auth.signInWithGoogle().then((result) => {
  //     console.log('succcess', result);
  //     console.log(auth.currentUser);
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = credentials;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setError(null);
        history.push('/');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <AppWrapper>
      <AuthWrapper>
        <h1>Sign In</h1>
        {location.state && location.state.referrer === 'watchlist' && (
          <Alert severity="info">
            You must be signed in in order to save securities to your watchlist.
            Log in below or <Link to="/signup">create an account</Link>.
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
          <Link to="/accounts/password" className="forgot-password">
            Forgot Password?
          </Link>
          <button type="submit">
            {loading ? <BeatLoader size={12} color="#fff" /> : 'Sign In'}
          </button>
        </form>
        <div className="link-text">
          <span>Don't have an account?</span>
          <Link to="/accounts/signup">Sign up</Link>
        </div>
      </AuthWrapper>
    </AppWrapper>
  );
}

export default SignIn;
