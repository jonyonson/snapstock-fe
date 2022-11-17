import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import AuthWrapper from '../styles/auth.styled';
import useQueryParams from '../hooks/use-query-params';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/use-auth';
import { PATHS } from '../config/constants';
import { useHistory } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const auth = useAuth();

  const query = useQueryParams();
  const code = query.get('oobCode');
  console.log(code);

  const handleChange = (e) => {
    setDisabled(false);
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // verify the password reset code is valid.
    // auth
    //   .verifyPasswordReset(code)
    //   .then((email) => {
    //     console.log(email);
    //     // Display a "new password" form with the user's email address
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    auth
      .confirmPasswordReset(code, password)
      .then(() => {
        setLoading(false);
        // reset the password in the database
        // redirect to login with success message
        history.push({
          pathname: PATHS.ROUTES.SIGN_IN,
          state: { referrer: 'password-reset' },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <AuthWrapper>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
          />

          <button type="submit" disabled={disabled}>
            {loading ? (
              <BeatLoader size={12} color="#fff" />
            ) : (
              'Create New Passwod'
            )}
          </button>
        </form>
      </AuthWrapper>
    </Layout>
  );
}

export default ResetPassword;
