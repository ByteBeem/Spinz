import React, { useState } from "react";
import axios from "axios";
import "./modal.scss";
import ErrorModal from "../ErrorModal/ErrorModal";

const ErrorModal = ({ isOpen, onClose }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [errorModalOpen, setErrorModalOpen] = useState(false);
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
        setErrorMessage("You entered incorrect OTP, Try again.");
        setErrorModalOpen(true);
      } else {
        alert("Account Opened, go Log in!");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("An error occurred while verifying OTP.");
      setErrorModalOpen(true);
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
        </div>
        <ErrorModal
          errorMessage={errorMessage}
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
        />
      </div>
    )
  );
};

export default ErrorModal;
