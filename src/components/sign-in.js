import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthWrapper from '../styles/auth.styled';
import Header from './header';

function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
    <Fragment>
      <Header />
      <AuthWrapper>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            onChange={handleChange}
            value={credentials.email}
          />
          <input
            name="password"
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
