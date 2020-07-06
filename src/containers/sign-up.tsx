import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import AuthWrapper from '../styles/auth.styled';
import AppWrapper from '../components/common/app-wrapper';
import Alert from '../components/common/alert';
import { BASE_API_URL } from '../constants';

function SignUp() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${BASE_API_URL}/auth/register`, credentials)
      .then((res) => {
        setError(null);
        localStorage.setItem('token', res.data.token);
        history.push('/');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
        // TODO: handle errors
        // TODO: handle already registered
        console.log(err.response);
      });
  };

  return (
    <AppWrapper>
      <AuthWrapper>
        <h1>Sign Up</h1>
        {error && <Alert type="error">{error}</Alert>}
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
          <Link to="/signin">Sign in</Link>
        </div>
      </AuthWrapper>
    </AppWrapper>
  );
}

export default SignUp;