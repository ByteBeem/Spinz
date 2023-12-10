// PictureWithPlayButton.js

import React from "react";
import "./styles/PictureWithPlayButton.css";
import { Link, useNavigate } from "react-router-dom";

const backgroundStyle = {
  backgroundImage:
    'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4041567.jpg&f=1&nofb=1&ipt=18445b79bbb2c0f9c4b98c98dd83e88424ac79daf3b1721f6d802f092d369b4b&ipo=images")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const PictureWithPlayButton = ({ showSidebar, active, closeSidebar }) => {
  const navigate = useNavigate();
  const handlePlayClick = () => {
    window.location.href = "https://spinz-spin.vercel.app";
  };
  const games = () => {
    navigate("/games");
  };

  return (
    <div className="picture-container" style={backgroundStyle}>
      <div className="picture">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7lqyZ1FHxTs65fbP_sQyUwHaEo%26pid%3DApi&f=1&ipt=7113c8048717ba1594332e5bc8dc68ff4db0f444d95db256a679374087de0f43&ipo=images"
          // Replace with your image URL
          alt="First Picture"
        />
        <button className="play-button" onClick={handlePlayClick}>
          ▶
        </button>
      </div>
      <div className="picture2">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcrayonsandcravings.com%2Fwp-content%2Fuploads%2F2019%2F04%2FColors-Word-Search-Free-Printable-735x951.jpg&f=1&nofb=1&ipt=15a76c80aff9e06aac36ea27042dad54207ecdab0cb4c4cf100e0c9cf3f3d7c6&ipo=images"
          // Replace with your image URL
          alt="Second Picture"
        />
        <button className="play-button" onClick={games}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default PictureWithPlayButton;
