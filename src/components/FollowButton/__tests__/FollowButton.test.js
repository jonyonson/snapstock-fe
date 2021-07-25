import React from 'react';
import { render, screen } from '@testing-library/react';

import FollowButton from '../FollowButton';

describe('FollowButton', () => {
  it('contains the text `Following` if stock is on watchlist', () => {
    render(<FollowButton isFollowing={true} />);
    const buttonText = screen.getByTestId('follow-button-text');
    expect(buttonText).toHaveTextContent('Following');
  });

  it('contains the text `Follow` if stock is not on watchlist', () => {
    render(<FollowButton isFollowing={false} />);
    const buttonText = screen.getByTestId('follow-button-text');
    expect(buttonText).toHaveTextContent('Follow');
  });

  it('contains the check icon if stock is on watchlist', () => {
    render(<FollowButton isFollowing={true} />);
    const icon = screen.getByTestId('check-icon');
    expect(icon).toBeInTheDocument();
  });

  it('contains the plus icon if stock is not on watchlist', () => {
    render(<FollowButton isFollowing={false} />);
    const icon = screen.getByTestId('plus-icon');
    expect(icon).toBeInTheDocument();
  });
});
