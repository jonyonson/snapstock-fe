import React from 'react';
import a from 'indefinite';

import Alert from './Alert';

export default {
  title: 'Alert',
  component: Alert,
};

const Template = (args) => (
  <Alert {...args}>{`This is ${a(args.severity)} alert!`}</Alert>
);

const MultipleTemplate = (args) => {
  const { severity1, severity2, severity3, severity4 } = args;
  return (
    <>
      <Alert severity={severity1}>{`This is ${a(severity1)} alert!`}</Alert>
      <Alert severity={severity2}>{`This is ${a(severity2)} alert!`}</Alert>
      <Alert severity={severity3}>{`This is ${a(severity3)} alert!`}</Alert>
      <Alert severity={severity4}>{`This is ${a(severity4)} alert!`}</Alert>
    </>
  );
};

export const Info = Template.bind({});
Info.args = {
  severity: 'info',
};

export const Error = Template.bind({});
Error.args = {
  severity: 'error',
};

export const Warning = Template.bind({});
Warning.args = {
  severity: 'warning',
};

export const Success = Template.bind({});
Success.args = {
  severity: 'success',
};

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  severity1: 'success',
  severity2: 'info',
  severity3: 'error',
  severity4: 'warning',
};
