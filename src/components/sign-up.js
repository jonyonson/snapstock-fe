import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthWrapper from '../styles/auth.styled';
import Header from './header';

function SignUp() {
  return (
    <Fragment>
      <Header />
      <AuthWrapper>
        <h1>Sign Up</h1>
        Already have an account?{' '}
        <Link className="signup-link" to="/signin">
          Sign in.
        </Link>
      </AuthWrapper>
    </Fragment>
  );
}

export default SignUp;
