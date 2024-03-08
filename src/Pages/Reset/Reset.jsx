import React, { useState } from "react";
import "./Reset.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';

function Reset({ showSidebar, active, closeSidebar }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");
    setSuccessMessage(null);
    const token = localStorage.getItem("token");
    if(!token){
      setError("You need to log in first!");
      setIsLoading(false);
      return;
    }

    if (!newPassword ) {
      setError("Enter new Password.");
      setIsLoading(false);
      return;
    }

    if (!oldPassword ) {
      setError("Enter old Password.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setIsLoading(false);
      return;
    }

    const requestBody = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      token: token,
    };

    try {
      const response = await axios.post("https://spinzserver-e34cd148765a.herokuapp.com/changePassword", requestBody);
      
      if (response.status === 200) {
        setMessage("Password changed successfully.");
      } else {
        setError(response.data.message || "An error occurred while resetting the password.");
      }
    } catch (error) {
      setError("An error occurred while resetting the password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="reset_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
          <div className="form">
            <div>
              <label htmlFor="oldPassword">Enter Old Password</label>
              <input 
                type="password" 
                id="oldPassword" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="newPassword">Enter New Password</label>
              <input 
                type="password" 
                id="newPassword" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>
            <button
              className="form_btn"
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
