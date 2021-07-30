import React from 'react';
import AppWrapper from '../components/app-wrapper';
import { useAuth } from '../hooks/use-auth';
import { PATHS } from '../config/constants';
import { Redirect } from 'react-router-dom';

function Profile() {
  const auth = useAuth();

  return localStorage.getItem('user') ? (
    <AppWrapper>
      {auth.user && (
        <div>
          <div>email: {auth.user.email}</div>
        </div>
      )}
    </AppWrapper>
  ) : (
    <Redirect to={PATHS.ROUTES.SIGN_IN} />
  );
}

export default Profile;
