import React, { useState } from 'react';
import axios from 'axios';
import './styles/Withdraw.css';

const VideoComponent = () => {
  const [cellphoneNumber, setCellphoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const videoUrl = 'https://husky-shimmer-shame.glitch.me';

  const startGame = async () => {
    try {
      setLoading(true);
  
      // Send a request to the /startGame endpoint with the cellphoneNumber
      const response = await axios.post('https://husky-shimmer-shame.glitch.me/startGame', {
        cellphoneNumber: cellphoneNumber,
       
      });
  
      setMessage(response.data.message);
      window.location.href = response.data.gameLink;
      setLoading(false);
    } catch (err) {
      setError('Error starting the game',err);
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

      <div>
        <label htmlFor="cellphoneNumber">Cellphone Number:</label>
        <input
          type="text"
          id="cellphoneNumber"
          value={cellphoneNumber}
          onChange={(e) => setCellphoneNumber(e.target.value)}
        />
      </div>

      <div>
        <button onClick={startGame} disabled={loading}>
          {loading ? 'Loading...' : 'Start Game'}
        </button>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VideoComponent;
