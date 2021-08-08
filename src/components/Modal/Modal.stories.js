import React from 'react';
import { showModal, closeModal } from '../../utils/modal';

import Modal from './Modal';

export default {
  title: 'Modal',
  component: Modal,
};

const Template = (args) => {
  const showTheDangModal = () => {
    showModal('modal-1', {
      onClose: function () {
        console.log('CLOSE MODAL!');
      },
    });
  };

  return (
    <>
      <button onClick={showTheDangModal}>Trigger</button>
      <Modal {...args}>
        <div>I am a modal</div>
        <button onClick={() => closeModal('modal-1')}>Close</button>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'modal-1',
  title: 'Default Modal',
};
