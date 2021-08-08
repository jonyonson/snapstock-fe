import React from 'react';
import PropTypes from 'prop-types';
// import MicroModal from 'micromodal';
import './Modal.scss';

function Modal({ id, title, children }) {
  return (
    <div id={id} className="Modal" aria-hidden="true" data-testid="modal">
      <div tabIndex="-1" data-micromodal-close className="Modal__overlay">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          className="Modal__container"
        >
          <header className="Modal__header">
            <h2 id={`${id}-title`} className="Modal__title">
              {title}
            </h2>
            <button
              className="Modal__close"
              aria-label="Close modal"
              data-micromodal-close
            />
          </header>

          <div className="Modal__content" id={`${id}-content`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
