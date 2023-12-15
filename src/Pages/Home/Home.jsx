import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";
import Games from "../../Data/Games";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = ({ showSidebar, active, closeSidebar }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [loading, setLoading] = useState(false);
  const [betAmountInput, setBetAmountInput] = useState(""); // State for storing bet amount
  const { setToken } = useAuth();

  const handlePlayClick = async (id) => {
    const storedToken = localStorage.getItem("token");

    if (id === 2) {
      const userBetAmount = prompt("Enter your bet amount:");
      if (userBetAmount === null || isNaN(parseFloat(userBetAmount)) || parseFloat(userBetAmount) <= 0) {
        alert("Invalid bet amount. Please enter a valid bet amount.");
        return;
      }

      setBetAmountInput(userBetAmount);
    }

    setLoading(true);

    try {
      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };

      switch (id) {
        case 1:
          const slotResponse = await axios.post(
            "https://heavenly-onyx-bun.glitch.me/slot",
            {},
            { headers }
          );
          const { gameLink: slotGameLink } = slotResponse.data;
          window.location.href = slotGameLink;
          break;

        case 2:
          const startGameResponse = await axios.post(
            "https://heavenly-onyx-bun.glitch.me/startGame",
            { betAmount: betAmountInput },
            { headers }
          );

          const { gameLink: startGameLink } = startGameResponse.data;
          window.location.href = startGameLink;
          break;

        case 3:
          // Additional cases can be added here
          break;

        case 4:
          window.location.href = "https://tac-game.vercel.app/";
          break;

        case 5:
          const diceResponse = await axios.post(
            "https://heavenly-onyx-bun.glitch.me/dice",
            {},
            { headers }
          );
          const { gameLink: diceGameLink } = diceResponse.data;
          window.location.href = diceGameLink;
          break;

        default:
          console.log("Unknown game id");
      }
    } catch (error) {
      console.error("Error fetching or redirecting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="home_container">
        <Navbar showSidebar={showSidebar} />
        <div className="content">
          <div className="games_slider">
            <div className="div">
              <Slider {...settings}>
                {Games.map(({ id, title, img }) => (
                  <div key={id} className="game_box">
                    <img src={img} alt="" className="game_img" />
                    <div className="title">{title}</div>
                    <div
                      className="form_btn"
                      onClick={() => handlePlayClick(id)}
                    >
                      {loading ? "Loading..." : "Play"}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
