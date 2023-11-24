import React, { useState } from 'react';
import axios from 'axios';
import './styles/Withdraw.css';

const VideoComponent = () => {
  const [cellphoneNumber, setCellphoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const videoUrl = 'https://youtu.be/r4Fqa3PdHjU';

  const startGame = async () => {
    try {
      setLoading(true);
      const betAmount = parseFloat(cellphoneNumber);
      const storedToken = localStorage.getItem('token');
      alert(storedToken);
      // Send a request to the /startGame endpoint with the cellphoneNumber
      const response = await axios.post(
        'https://heavenly-onyx-bun.glitch.me/startGame',
        {
          betAmount: betAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
  
      setMessage(response.data.message);
      window.location.href = response.data.gameLink;
    } catch (err) {
      
      setMessage(response.data.message);
      
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='withdraw'>
      <div>
        <iframe
          width="330"
          height="215"
          src={videoUrl}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <div>
        <label htmlFor="cellphoneNumber">Bet Amount:</label>
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
