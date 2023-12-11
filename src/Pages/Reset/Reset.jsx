import React, { useState } from "react";
import "./Reset.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Reset({ showSidebar, active, closeSidebar }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleResetPassword = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/reset-password2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer your_jwt_token_here`,
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Password reset email sent successfully");
      } else {
        const data = await response.json();
        setError(
          data.message || "An error occurred while resetting the password"
        );
      }
    } catch (error) {
      setError("An error occurred while resetting the password");
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
              <label htmlFor="">Enter Old password</label>
              <input type="password" />
            </div>
            <div>
              <label htmlFor="">Enter New password</label>
              <input type="password" />
            </div>
            <div>
              <label htmlFor="">Confirm New password</label>
              <input type="password" />
            </div>
            <button className="form_btn">submit</button>
          </div>
        </div>
      </div>

      {/* <h1>Password Reset</h1>
      <button onClick={handleResetPassword} disabled={isLoading}>
        {isLoading ? "Resetting Password..." : "Reset Password"}
      </button>
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>} */}
    </div>
  );
}

export default Reset;
