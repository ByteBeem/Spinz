import React, { useState } from 'react';
//import './styles/PasswordReset.css';


function PasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleResetPassword = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
     
      const response = await fetch('/reset-password2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer your_jwt_token_here`, 
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Password reset email sent successfully');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred while resetting the password');
      }
    } catch (error) {
      setError('An error occurred while resetting the password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <button onClick={handleResetPassword} disabled={isLoading}>
        {isLoading ? 'Resetting Password...' : 'Reset Password'}
      </button>
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default PasswordReset;
