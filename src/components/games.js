import React, { useState } from "react";
import axios from "axios";
// import "../components/Withdrawal/Withdraw.css";

const VideoComponent = () => {
  const [cellphoneNumber, setCellphoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBetInfo, setShowBetInfo] = useState(true);
  const videoUrl =
    "https://www.youtube.com/watch?v=r4Fqa3PdHjU&feature=youtu.be";

  const startGame = async () => {
    try {
      setLoading(true);
      const betAmount = parseFloat(cellphoneNumber);
      const storedToken = localStorage.getItem("token");

      const response = await axios.post(
        "https://heavenly-onyx-bun.glitch.me/startGame",
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
      setMessage("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOkClick = () => {
    setShowBetInfo(false);
  };

  return (
    <div className="withdraw">
      {showBetInfo && (
        <div className="bet-info-box">
          <h2>Winning Information</h2>
          <ul>
            <li>R10 bet wins R80</li>
            <li>R20 bet wins R150</li>
            <li>R30 bet wins R200</li>
            <li>R40 bet wins R230</li>
            <li>R50 bet wins R290</li>
          </ul>
          <button onClick={handleOkClick}>OK</button>
        </div>
      )}

      <div className="video-container">
        <iframe
          width="330"
          height="215"
          src="https://www.youtube.com/embed/r4Fqa3PdHjU"
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
          {loading ? "Loading..." : "Start Game"}
        </button>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VideoComponent;
