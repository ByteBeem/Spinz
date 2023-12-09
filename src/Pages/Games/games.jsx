import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./games.scss";

const VideoComponent = ({ showSidebar, active, closeSidebar }) => {
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
      setError("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOkClick = () => {
    setShowBetInfo(false);
  };

  return (
    <div className="withdraw">
      <div>
        <Sidebar active={active} closeSidebar={closeSidebar} />

        <div className="withdraw_container">
          <Navbar showSidebar={showSidebar} />

          <div className="content">
            {showBetInfo && <div className="balance_info"></div>}

            <div className="middle">
              <div className="left">
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
                <div className="right">
                  <div className="dropdown_container">
                    <label htmlFor="cellphoneNumber">Bet Amount:</label>
                    <br />
                    <input
                      type="text"
                      id="cellphoneNumber"
                      value={cellphoneNumber}
                      onChange={(e) => setCellphoneNumber(e.target.value)}
                      inputMode="numeric"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
