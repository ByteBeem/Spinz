import React, { useState } from 'react';
import axios from 'axios';

import './Modal.scss';

export default function Modal({ visible, closeModal }) {
  const [showPayment, setShowPayment] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [aviatorNumber, setAviatorNumber] = useState(null);

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
    {},
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
      setPaymentSuccess(true);
      setAviatorNumber(generateRandomAviatorNumber());

      
      alert('Payment successful!');

     
      setTimeout(() => {
        closeModal();
      }, 10000);
    })
    .catch((error) => {
      setShowLoadingSpinner(false);
      alert('Payment failed');
    });
};


  // Function to calculate the next aviator movement time (example: 5 minutes from the current time)
  const calculateNextAviatorTime = () => {
    const currentTime = new Date();
    const nextAviatorTime = new Date(currentTime.getTime() + 5 * 60000); // 5 minutes in milliseconds
    return nextAviatorTime.toLocaleTimeString();
  };

  // Function to generate a random aviator number between 0.00 and 35.00
  const generateRandomAviatorNumber = () => {
    const randomDecimal = (Math.random() * 35).toFixed(2);
    return parseFloat(randomDecimal);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {paymentSuccess ? (
          <>
            <h2 className="modal-title">Prediction</h2>
            <p className="modal-text">
              The next aviator movement is {aviatorNumber}. Make sure not to miss it at {calculateNextAviatorTime()}.
            </p>
          </>
        ) : (
          <>
            <h2 className="modal-title">Disclaimer</h2>
            <p className="modal-text">
              This section offers 90% accuracy with aviator upcoming movements, but it is a premium choice. To continue, you agree to pay a fee of R30.
            </p>
          </>
        )}

        {showLoadingSpinner ? (
          <div className="loading-spinner"></div>
        ) : showPayment && !paymentSuccess ? (
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
            {!paymentSuccess && (
              <button
                className="modal-button modal-button-green"
                onClick={handleContinue}
              >
                Continue (R30)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
