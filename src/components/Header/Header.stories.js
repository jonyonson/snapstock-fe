import React from 'react';

import Header from './Header';

export default {
  title: 'Header',
  component: Header,
};

const UnauthedTemplate = (args) => {
  localStorage.removeItem('user');
  return <Header {...args} />;
};

const AuthedTemplate = (args) => {
  localStorage.setItem('user', 'true');
  return <Header {...args} />;
};

export const Unauthenticated = UnauthedTemplate.bind({});
Unauthenticated.args = {};

export const Authenticated = AuthedTemplate.bind({});
Authenticated.args = {};
