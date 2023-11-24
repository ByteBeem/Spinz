import React, { useState } from 'react';
import './styles/Withdraw.css';

const VideoComponent = () => {
  const [cellphoneNumber, setCellphoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const videoUrl = 'https://husky-shimmer-shame.glitch.me';

  const handleStartClick = async () => {
    try {
      setLoading(true);

      // Your API endpoint
      const apiUrl = 'https://husky-shimmer-shame.glitch.me/startGame';

      

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({ cellphoneNumber }), // Send cellphoneNumber in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        window.location.href = data.gameLink;
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='withdraw'>
      <div>
        <iframe
          width="430"
          height="715"
          src={videoUrl}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        
      </div>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VideoComponent;
