import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthWrapper from '../styles/auth.styled';
import Header from './header';

function SignIn() {
  return (
    <Fragment>
      <Header />
      <AuthWrapper>
        <h1>Sign In</h1>
        <Link className="signup-link" to="/signup">
          Create an account
        </Link>
      </AuthWrapper>
    </Fragment>
  );
}

export default SignIn;
