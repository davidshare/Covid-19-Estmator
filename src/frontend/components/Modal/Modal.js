import React from 'react';

import './Modal.scss';

const Modal = ({ closeModal, show, children }) => {
  const modalClass = show ? "modal show-modal" : "modal hide-modal";

  return (
    <div className={modalClass}>
      <div className="modal-body">
        {children}
      </div>
      <span onClick={closeModal} className="close-icon">&#10006;</span>
    </div>
  );
};

export default Modal;