import React from 'react';
import { render, screen } from '@testing-library/react';

import IndexWidget from '../IndexWidget';

const index = {
  avgVolume: 320389206,
  change: 238.15078124999854,
  dayRange: '34,855.11 - 35,095.33',
  open: 34855.11,
  percentChange: 0.6838814740950009,
  previousClose: 34823.4,
  price: 35061.55078125,
  volume: 315059460,
  yearRange: '25,992.28 - 35,095.33',
};

describe('IndexWidget', () => {
  it('contains the correct modifier class when index is up', () => {
    render(<IndexWidget index={index} name="DOW" />);
    const widget = screen.getByTestId('index-widget');
    expect(widget).toHaveClass('index-widget--up');
  });

  it('contains the correct modifier class when index is down', () => {
    render(
      <IndexWidget index={{ ...index, percentChange: -0.2 }} name="DOW" />,
    );
    const widget = screen.getByTestId('index-widget');
    expect(widget).toHaveClass('index-widget--down');
  });

  it('contains the correct modifier class when loading', () => {
    render(<IndexWidget index={null} name="DOW" />);
    const widget = screen.getByTestId('index-widget');
    expect(widget).toHaveClass('index-widget--loading');
  });

  it('shows numbers in correct format when index is up', () => {
    render(<IndexWidget index={index} name="DOW" />);
    expect(screen.getByText('+0.68%')).toBeInTheDocument();
    expect(screen.getByText('35,061.55')).toBeInTheDocument();
    expect(screen.getByText('+238.15')).toBeInTheDocument();
  });

  it('shows numbers in correct format when index is down', () => {
    render(
      <IndexWidget
        index={{ ...index, change: -238.15078, percentChange: -0.684 }}
        name="DOW"
      />,
    );
    expect(screen.getByText('-0.68%')).toBeInTheDocument();
    expect(screen.getByText('-238.15')).toBeInTheDocument();
  });
});
