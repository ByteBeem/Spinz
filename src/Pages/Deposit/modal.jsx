import React, { useState } from 'react';
import axios from 'axios';

import './Modal.scss';

export default function Modal({ visible, closeModal, content }) {
  const [showPayment, setShowPayment] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  if (!visible) return null;

  const handleContinue = () => {
    setShowPayment(true);
  };

  const handlePay = () => {
    const storedToken = localStorage.getItem('token');
    console.log("token", storedToken);
    setShowLoadingSpinner(true);

    axios.post(
      'https://spinz-servers-17da09bbdb53.herokuapp.com/pay',
      {
       
        depositAmount: depositAmount, 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
          'Origin': 'https://www.shopient.co.za',
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          alert("Insufficient balance");
          throw new Error('Payment failed');
        }
      })
      .then((data) => {
        setShowLoadingSpinner(false);
        alert('Payment successful!');
        closeModal();
        window.location.href = data.gameLink;
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
          Hola, You choose to use <b>{content.label}</b> as your deposit method which is safe and secure.
        </p>

        {showLoadingSpinner ? (
          <div className="loading-spinner"></div>
        ) : showPayment ? (
          <div className="payment-box">
            <div className="modal-buttons">
              <button
                className="modal-button modal-button-red"
                onClick={closeModal}
              >
                Back
              </button>
              <button
                className="modal-button modal-button-green "
                onClick={() => handlePay()}
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
            <div>
              <input
                type="number"
                placeholder="Enter deposit amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
              <button
                className="modal-button modal-button-green"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
