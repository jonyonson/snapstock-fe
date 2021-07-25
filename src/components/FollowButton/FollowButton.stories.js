import React from 'react';

import FollowButton from './FollowButton';

export default {
  title: 'Follow Button',
  component: FollowButton,
};

const Template = (args) => <FollowButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  isFollowing: true,
};
