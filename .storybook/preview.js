import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import GlobalStyles from '../src/styles/global-styles';
import { BrowserRouter } from 'react-router-dom';
import '../src/styles/index.scss';

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
