import React, { useState } from "react";
import axios from "axios";
import "./modal.scss";

const ErrorModal = ({ isOpen, onClose }) => {
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false)
    ;
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    axios.post("https://spinzserver-e34cd148765a.herokuapp.com/confirm-otp", { otp })
      .then(response => {

        if(response.status === 403){
          alert("Wrong OTP!")
        }

        else{
          alert("Account Opened , go Log in!")
        }
        setIsLoading(false);
        onClose();
      })
      .catch(error => {

        console.error("Error verifying OTP:", error);
        setIsLoading(false);
      });
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
            value={otp}
            onChange={handleOTPChange}
            placeholder="Enter the OTP you received"
          />
          <button className="ok-button" onClick={handleSubmit}>
            {isLoading ?
              'Verifying...'
              :
              'Submit'
            }
          </button>
        </div>
      </div>
    )
  );
};

export default ErrorModal;
