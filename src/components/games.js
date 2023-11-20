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

  const handleStartClick = () => {
    if (isNaN(betAmount) || betAmount <= 0) {
      setError('Invalid bet amount');
      setLoading(false);
      return;
    }
    // Add logic to handle starting the bet
    console.log('Bet started with amount:', betAmount);
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
