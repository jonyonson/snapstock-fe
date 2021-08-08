import MicroModal from 'micromodal';

const DEFAULT_OPTIONS = {
  // onShow: () => {},
  // onClose: () => {},
  // openTrigger: 'data-micromodal-trigger'
  // closeTrigger: 'data-micromodal-close'
  openClass: 'Modal--open',
  disableScroll: true,
  // disableFocus: false,
  // awaitOpenAnimation: false,
  awaitCloseAnimation: true,
  // debugMode: false
};

function initModal(options = {}) {
  MicroModal.init({ ...DEFAULT_OPTIONS, ...options });
}

function showModal(modalId, options = {}) {
  if (typeof modalId !== 'string') {
    throw new Error('Modal id is required.');
  }

  MicroModal.show(modalId, {
    ...DEFAULT_OPTIONS,
    ...options,
  });
}

function closeModal(modalId) {
  if (typeof modalId !== 'string') {
    throw new Error('Modal id is required.');
  }

  MicroModal.close(modalId);
}

export { initModal, showModal, closeModal };
