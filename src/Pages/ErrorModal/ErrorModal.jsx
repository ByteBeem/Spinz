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
        </div>
      </div>
    )
  );
};

export default ErrorModal;
