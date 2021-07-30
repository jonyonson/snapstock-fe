import React from 'react';

import FollowButton from './FollowButton';

export default {
  title: 'Follow Button',
  component: FollowButton,
};

const Template = (args) => <FollowButton {...args} />;

export const Following = Template.bind({});
Following.args = {
  isFollowing: true,
};

export const NotFollowing = Template.bind({});
NotFollowing.args = {
  isFollowing: false,
};
