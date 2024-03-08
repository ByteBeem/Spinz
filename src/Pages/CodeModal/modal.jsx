import React, { useState } from "react";
import axios from "axios";
import "./modal.scss";

const ErrorModal = ({  isOpen, onClose }) => {
  const [otp, setOTP] = useState("");

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = () => {
    // Here you can send the OTP to the server using Axios
    axios.post("/api/verify-otp", { otp })
      .then(response => {
        // Handle response accordingly
        console.log("OTP verification successful");
        onClose(); // Close modal
      })
      .catch(error => {
        // Handle error
        console.error("Error verifying OTP:", error);
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
            OK
          </button>
        </div>
      </div>
    )
  );
};

export default ErrorModal;
