import React, { useState } from 'react';
import './Modal.scss';

export default function Modal({ visible, closeModal }) {
  const [showPayment, setShowPayment] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const token = localStorage.getItem('token');

  if (!visible) return null;

  const handleContinue = () => {
    setShowPayment(true);
  };

  const handlePay = () => {
   
    setShowPayment(false);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Disclaimer</h2>
        <p className="modal-text">
          This section offers higher winning chances and making more money fast, but it involves risks. To continue, you agree to let us handle the trading for you.
        </p>

        {showLoadingSpinner ? (
          <div className="loading-spinner"></div>
        ) : showPayment ? (
          <div className="payment-box">
            <div className="modal-buttons">
              <button
                className="modal-button modal-button-green"
                onClick={handlePay}
              >
                Agree
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-buttons">
            <button
              className="modal-button modal-button-red"
              onClick={closeModal}
            >
              Back
            </button>
            <button
              className="modal-button modal-button-green"
              onClick={handleContinue}
            >
        Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
