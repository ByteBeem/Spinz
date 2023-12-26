import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";
import Games from "../../Data/Games";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EasyWinSection = () => {
  const handleButtonClick = () => {
    
    console.log("Button clicked!");
  };

  return (
    <div className="easyWin_section">
    
      <button className="glowButton" onClick={handleButtonClick}>
        Easy Win
      </button>
    </div>
  );
};

const Home = ({ showSidebar, active, closeSidebar }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

   const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(false);
  const [betAmountInput, setBetAmountInput] = useState("");
  const { setToken } = useAuth();

  const handlePlayClick = async (id) => {
    const storedToken = localStorage.getItem("token");

    if (id === 2) {
      const userBetAmount = prompt("Enter your bet amount:");

      if (!userBetAmount || isNaN(parseFloat(userBetAmount)) || parseFloat(userBetAmount) <= 0) {
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
            "https://spinz-servers-17da09bbdb53.herokuapp.com/slot",
            {},
            { headers }
          );
          window.location.href = slotResponse.data.gameLink;
          break;

        case 2:
          const startGameResponse = await axios.post(
            "https://spinz-servers-17da09bbdb53.herokuapp.com/startGame",
            { betAmount: betAmountInput },
            { headers }
          );
          window.location.href = startGameResponse.data.gameLink;
          break;

        case 4:
          window.location.href = "https://tac-game.vercel.app/";
          break;

        case 5:
          const diceResponse = await axios.post(
            "https://spinz-servers-17da09bbdb53.herokuapp.com/dice",
            {},
            { headers }
          );
          window.location.href = diceResponse.data.gameLink;
          break;

        case 6:
          window.location.href = "https://tac-game.vercel.app/";
          break;

        case 7:
          const wheelResponse = await axios.post(
            "https://spinz-servers-17da09bbdb53.herokuapp.com/wheel",
            {},
            { headers }
          );
          window.location.href = wheelResponse.data.gameLink;
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

//  if (!token) {
//     // Redirect to www.shopient.co.za/login
//     window.location.href = 'https://www.shopient.co.za/login';

//     return null;
//   }

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

        <EasyWinSection />
      </div>
    </div>
  </div>
);
};

export default Home;
