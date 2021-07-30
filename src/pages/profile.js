import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/use-auth';
import { PATHS } from '../config/constants';
import { Redirect } from 'react-router-dom';

function Profile() {
  const auth = useAuth();

  return localStorage.getItem('user') ? (
    <Layout>
      {auth.user && (
        <div>
          <div>email: {auth.user.email}</div>
        </div>
      )}
    </Layout>
  ) : (
    <Redirect to={PATHS.ROUTES.SIGN_IN} />
  );
}

export default Profile;
