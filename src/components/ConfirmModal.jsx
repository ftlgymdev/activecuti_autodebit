import React from 'react';
import { useModal, useEscKey } from '../hooks/useModal';

const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Ya, Ajukan', 
  cancelText = 'Batal',
  onConfirm, 
  onCancel,
  isLoading = false,
  loadingText = 'Mengirim...',
  children 
}) => {
  useModal(isOpen);
  useEscKey(isOpen, onCancel);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
          {children}
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="modal-btn modal-btn-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button 
            type="button" 
            className="modal-btn modal-btn-confirm"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 