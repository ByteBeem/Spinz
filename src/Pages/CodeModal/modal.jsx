import React, { useState } from "react";
import axios from "axios";
import "./modal.scss";


const ErrorModal = ({ isOpen, onClose }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
 
  const handleOTPChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const cell = localStorage.getItem("number");

    try {
      const response = await axios.post(
        "https://spinzserver-e34cd148765a.herokuapp.com/confirm-otp",
        { code, cell }
      );

      if (response.status === 403) {
        setError(
          'You entered Incorrect OTP , try again.'
        );
       
      } else {
        setMessage(
          'Account Opened, go Log in.'
        );
       
     
      }
    } catch (error) {
      
      setError("An error occurred while verifying OTP.");
      
    }

    setIsLoading(false);
    onClose();
  };

  return (
    isOpen && (
      <div className="error-modal-overlay">
        <div className="error-modal">
          <button className="close-button" onClick={onClose}>
            X
          </button>

          <input
            type="number"
            value={code}
            onChange={handleOTPChange}
            placeholder="Enter the OTP you received"
          />
          <button
           className="ok-button"
           disabled={isLoading}
            onClick={handleSubmit}>
            {isLoading ?
              'Verifying...'
              :
              'Submit'
            }
          </button>
          {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
        
      </div>
    )
  );
};

export default ErrorModal;
