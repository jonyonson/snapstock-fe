import React, { useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import AuthWrapper from '../styles/auth.styled';
import Header from './header';
import { BASE_API_URL } from '../constants';

function SignUp() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_API_URL}/auth/register`, credentials)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        history.push('/');
      })
      .catch((err) => {
        // TODO: handle errors
        // TODO: handle already registered
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Header />
      <AuthWrapper>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange}
            value={credentials.email}
          />
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={credentials.password}
          />
          <button type="submit">Sign In</button>
        </form>
        Already have an account?{' '}
        <Link className="signup-link" to="/signin">
          Sign in.
        </Link>
      </AuthWrapper>
    </Fragment>
  );
}

export default SignUp;
