import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import AuthWrapper from '../styles/auth.styled';
import AppWrapper from '../components/app-wrapper';
import { useAuth } from '../hooks/use-auth';

function SignIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const auth = useAuth();

  const handleChange = (e) => {
    setDisabled(false);
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    auth
      .sendPasswordResetEmail(email)
      .then((result) => {
        setLoading(false);
        setDisabled(true);
      })
      .catch((err) => {
        // TODO handle error
        console.log(err);
      });
  };

  return (
    <AppWrapper>
      <AuthWrapper>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange}
            value={email}
          />

          <button type="submit" disabled={disabled}>
            {loading ? (
              <BeatLoader size={12} color="#fff" />
            ) : disabled ? (
              'Please Check Your Email'
            ) : (
              'Send Password Reset'
            )}
          </button>
        </form>
      </AuthWrapper>
    </AppWrapper>
  );
}

export default SignIn;
