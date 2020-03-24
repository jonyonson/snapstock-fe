import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Protected = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem('token')) {
          return <Component />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default Protected;
