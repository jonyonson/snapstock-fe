import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import AuthWrapper from '../styles/auth.styled';
import AppWrapper from '../components/app-wrapper';
import Alert from '../components/Alert';
import { useAuth } from '../hooks/use-auth';
import { PATHS } from '../config/constants';

function SignUp() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const auth = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = credentials;
    auth
      .signup(email, password)
      .then((user) => {
        axios
          .post(PATHS.AUTH.REGISTER, {
            uuid: user.uid,
            email: user.email,
            display_name: user.displayName,
            photo_url: user.photoURL,
            email_verified: user.emailVerified,
          })
          .then((res) => {
            setError(null);
            history.push(PATHS.ROUTES.HOME);
          })
          .catch((err) => {
            console.error(err.response);
            setLoading(false);
            setError(err.response.data);
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <AppWrapper>
      <AuthWrapper>
        <h1>Sign Up</h1>
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
          <button type="submit">
            {loading ? <BeatLoader size={12} color="#fff" /> : 'Sign Up'}
          </button>
        </form>
        <div className="link-text">
          <span>Already have an account?</span>
          <Link to={PATHS.ROUTES.SIGN_IN}>Sign in</Link>
        </div>
      </AuthWrapper>
    </AppWrapper>
  );
}

export default SignUp;
