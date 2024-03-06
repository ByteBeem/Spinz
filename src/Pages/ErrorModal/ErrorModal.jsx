import React from "react";
import "./ErrorModal.scss";

const ErrorModal = ({ errorMessage, isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="error-modal-overlay">
        <div className="error-modal">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <div className="error-message">{errorMessage}</div>
          <button className="ok-button" onClick={onClose}>OK</button>
        </div>
      </div>
    )
  );
};

export default ErrorModal;
