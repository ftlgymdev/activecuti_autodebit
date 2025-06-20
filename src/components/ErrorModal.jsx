import React from 'react';
import { useModal, useEscKey } from '../hooks/useModal';

const ErrorModal = ({ isOpen, message, onClose }) => {
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
      <div className="modal-content modal-error">
        <div className="modal-header">
          <h3>Gagal!</h3>
        </div>
        <div className="modal-body">
          <div className="modal-error-icon">
            <i className="fa fa-exclamation-circle"></i>
          </div>
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="modal-btn modal-btn-cancel"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal; 