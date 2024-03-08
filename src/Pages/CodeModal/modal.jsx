import React, { useState } from "react";
import axios from "axios";
import "./modal.scss";

const ErrorModal = ({ isOpen, onClose }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false)
    ;
  const handleOTPChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    axios.post("https://spinzserver-e34cd148765a.herokuapp.com/confirm-otp", { code , token})
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
            value={code}
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
