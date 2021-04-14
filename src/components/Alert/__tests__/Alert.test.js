import React from 'react';
import { render, screen } from '@testing-library/react';

import Alert from './Alert';

describe('Alert', () => {
  it('renders a warning alert with correct class names', () => {
    render(<Alert severity="warning">Warning!</Alert>);
    const element = screen.getByTestId('alert');
    expect(element).toHaveClass('Alert-root');
    expect(element).toHaveClass('Alert-warning');
  });

  it('renders an info alert with correct class names', () => {
    render(<Alert severity="info">Info</Alert>);
    const element = screen.getByTestId('alert');
    expect(element).toHaveClass('Alert-root');
    expect(element).toHaveClass('Alert-info');
  });

  it('renders an error alert with correct class names', () => {
    render(<Alert severity="error">Error</Alert>);
    const element = screen.getByTestId('alert');
    expect(element).toHaveClass('Alert-root');
    expect(element).toHaveClass('Alert-error');
  });

  it('renders a success alert with correct class names', () => {
    render(<Alert severity="success">Success</Alert>);
    const element = screen.getByTestId('alert');
    expect(element).toHaveClass('Alert-root');
    expect(element).toHaveClass('Alert-success');
  });
});
