import React, { useState } from 'react';

const VideoComponent = () => {
  const [betAmount, setBetAmount] = useState('');
  const videoUrl = 'https://www.youtube.com/embed/r4Fqa3PdHjU';

  const handleInputChange = (event) => {
    setBetAmount(event.target.value);
  };

  const handleStartClick = () => {
    // Add logic to handle starting the bet
    console.log('Bet started with amount:', betAmount);
  };

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div style={{ marginTop: '20px' }}>
        <label htmlFor="betAmount">Enter Bet Amount:</label>
        <input
          type="text"
          id="betAmount"
          value={betAmount}
          onChange={handleInputChange}
        />
        <button onClick={handleStartClick}>Start</button>
      </div>
    </div>
  );
};

export default VideoComponent;
