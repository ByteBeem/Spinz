import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import Slider from "react-slick";
import Games from "../../Data/Games";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.scss";

const Home = ({ showSidebar, active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [betAmountInput, setBetAmountInput] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
      const headers = { Authorization: `Bearer ${storedToken}` };

      switch (id) {
        case 1:
        case 2:
        case 5:
        case 7:
          const response = await axios.post(
            `https://spinz-server-100d0276d968.herokuapp.com/${getGamePath(id)}`,
            getGameData(id),
            { headers }
          );
          if (response.status === 400) {
            alert("Insufficient Balance");
          } else {
            window.location.href = response.data.gameLink;
          }
          break;

        case 4:
        case 6:
          window.location.href = "https://tac-game.vercel.app/";
          break;

        default:
          console.log("Unknown game id");
      }
    } catch (error) {
      alert("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  };

  const getGamePath = (id) => {
    const paths = {
      1: "slot",
      2: "startGame",
      5: "dice",
      7: "wheel",
    };
    return paths[id] || "";
  };

  const getGameData = (id) => {
    if (id === 2) {
      return { betAmount: betAmountInput };
    }
    return {};
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
}

export default Home;
