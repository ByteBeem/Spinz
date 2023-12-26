import React from 'react';
import './Modal.scss';

export default function Modal({ visible, closeModal }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Disclaimer</h2>
        <p className="modal-text">
          This section offers higher winning chances and making more money fast, but it is a premium choice. To continue, you agree to pay a fee of R30.
        </p>

        <div className="modal-buttons">
          <button
            className="modal-button modal-button-red"
            onClick={closeModal}
          >
            Back
          </button>
          <button
            className="modal-button modal-button-green"
            // Add onClick handler for the "Continue" button, e.g., onClick={handleContinue}
          >
            Continue (R30)
          </button>
        </div>
      </div>
    </div>
  );
}
