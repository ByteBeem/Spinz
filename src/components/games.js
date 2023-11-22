import React, { useState } from 'react';
import './styles/Withdraw.css';

const VideoComponent = () => {
  const [betAmount, setBetAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const videoUrl = 'https://www.youtube.com/embed/r4Fqa3PdHjU';

  const handleInputChange = (event) => {
    setBetAmount(event.target.value);
  };

  const handleStartClick = async () => {
    const storedToken = localStorage.getItem('token');
    if (isNaN(betAmount) || betAmount <= 0) {
      setError('Invalid bet amount');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://heavenly-onyx-bun.glitch.me/startGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ betAmount: parseFloat(betAmount) }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        window.location.href = data.gameLink;

      } else {
        setError(data.error);
      }
    } catch (error) {
     
      setError('An unexpected error occurred');
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

        <label htmlFor="betAmount">Enter Bet Amount:</label>
        <input
          type="number"
          id="betAmount"
          value={betAmount}
          onChange={handleInputChange}
          inputMode="numeric" 
        />
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
