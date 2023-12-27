import React, { useState } from 'react';
import axios from 'axios';

import './Modal.scss';

export default function Modal({ visible, closeModal }) {
  const [showPayment, setShowPayment] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  if (!visible) return null;

  const handleContinue = () => {
    setShowPayment(true);
  };

  const handlePay = () => {
    const token = localStorage.getItem('token');
    setShowLoadingSpinner(true);

    axios.post('https://spinz-servers-17da09bbdb53.herokuapp.com/pay', null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Payment failed');
        }
      })
      .then((data) => {
        setShowLoadingSpinner(false);
        alert('Payment successful!');
        closeModal();
      })
      .catch((error) => {
        setShowLoadingSpinner(false);
        alert('Payment failed');
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Disclaimer</h2>
        <p className="modal-text">
          This section offers higher winning chances and making more money fast, but it is a premium choice. To continue, you agree to pay a fee of R30.
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
                Pay
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
              Continue (R30)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
