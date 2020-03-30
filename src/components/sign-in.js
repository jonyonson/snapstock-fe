import React, { useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import AuthWrapper from '../styles/auth.styled';
import Header from './header';
import { BASE_API_URL } from '../constants';

function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);

    axios
      .post(`${BASE_API_URL}/auth/login`, credentials)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
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
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={credentials.email}
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={credentials.password}
          />
          <button type="submit">Sign In</button>
        </form>
        <Link className="signup-link" to="/signup">
          Create an account
        </Link>
      </AuthWrapper>
    </Fragment>
  );
}

export default SignIn;
