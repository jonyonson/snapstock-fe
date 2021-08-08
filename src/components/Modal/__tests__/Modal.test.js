import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { showModal } from '../../../utils/modal';
import Modal from '../Modal';

describe('Modal', () => {
  it('is not visible by default', () => {
    render(
      <>
        <button data-micromodal-trigger data-testid="trigger">
          Trigger
        </button>
        <Modal id="test" title="Modal Title">
          I am a modal.
        </Modal>
      </>,
    );
    const modal = screen.getByTestId('modal');
    expect(modal).not.toHaveClass('Modal--open');
    expect(modal).toHaveAttribute('aria-hidden', 'true');
  });

  it('contains the text `Following` if stock is on watchlist', () => {
    render(
      <>
        <button onClick={() => showModal('test')} data-testid="trigger">
          Trigger
        </button>
        <Modal id="test" title="Modal Title">
          I am a modal.
        </Modal>
      </>,
    );
    const trigger = screen.getByTestId('trigger');
    const modal = screen.getByTestId('modal');
    fireEvent.click(trigger);

    expect(modal).toHaveClass('Modal--open');
    expect(modal).toHaveAttribute('aria-hidden', 'false');
  });
});
