import React from 'react';
import { useModal, useEscKey } from '../hooks/useModal';

const SuccessModal = ({ isOpen, message, onClose }) => {
  useModal(isOpen);
  useEscKey(isOpen, onClose);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content modal-success">
        <div className="modal-header">
          <h3>Berhasil!</h3>
        </div>
        <div className="modal-body">
          <div className="modal-success-icon">
            <i className="fa fa-check-circle"></i>
          </div>
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="modal-btn modal-btn-confirm"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 