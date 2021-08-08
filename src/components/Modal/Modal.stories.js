import React from 'react';
import { showModal, closeModal } from '../../utils/modal';
import Button from '../Button';
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
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
          harum nulla consequatur quos dolorum inventore, deleniti error quis
          voluptatum numquam molestiae exercitationem ipsum animi labore
          possimus ea neque. Illum, qui.
        </div>
        <Button
          variant="primary"
          label="OK"
          onClick={() => {
            alert('success');
            closeModal('modal-1');
          }}
        />
        <Button
          variant="secondary"
          onClick={() => closeModal('modal-1')}
          label="Cancel"
        />
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'modal-1',
  title: 'This is a Modal Title',
};
