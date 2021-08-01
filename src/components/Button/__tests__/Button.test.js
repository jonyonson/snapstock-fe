import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Button from '../Button';

describe('Button', () => {
  it('should render as a button element without an href', () => {
    render(<Button data-testid="button" label="Button" />);
    const element = screen.getByTestId('button');
    expect(element).not.toHaveAttribute('href');
  });

  it('should render as an anchor element with an href', () => {
    render(
      <BrowserRouter>
        <Button data-testid="button" label="Button" href="sign-up" />,
      </BrowserRouter>,
    );
    const element = screen.getByTestId('button');
    expect(element).toHaveAttribute('href', '/sign-up');
  });

  it('should include disabled attribute when loading is true', () => {
    render(<Button data-testid="button" label="Button" loading={true} />);
    const element = screen.getByTestId('button');
    expect(element).toHaveAttribute('disabled');
  });
});
