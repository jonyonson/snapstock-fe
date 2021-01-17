import React from 'react';

import BarLoader from './BarLoader';

export default {
  title: 'Loader',
  component: BarLoader,
};

const Template = (args) => <BarLoader {...args} />;

export const Default = Template.bind({});
Default.args = {
  // color: 'green',
  // width: 200,
};
