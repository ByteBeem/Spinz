import React from 'react';
import './ErrorModal.scss';

const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <div className="error-modal">
      <div className="error-modal-content">
        <p className="error-message">{errorMessage}</p>
        <button className="ok-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default ErrorModal;
