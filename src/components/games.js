import React, { useState } from 'react';
import './styles/Withdraw.css';

const VideoComponent = () => {
  const [betAmount, setBetAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const videoUrl = 'https://www.youtube.com/embed/r4Fqa3PdHjU';

  const handleStartClick = async () => {
    try {
      setLoading(true);

      // Your API endpoint
      const apiUrl = 'https://husky-shimmer-shame.glitch.me/startGame';

      // Token logic goes here, replace with your actual token logic
      const token = localStorage.getItem('token');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
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
          width="360"
          height="315"
          src={videoUrl}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <button onClick={handleStartClick} disabled={loading}>
          {loading ? 'Processing...' : 'Start'}
        </button>
      </div>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VideoComponent;
