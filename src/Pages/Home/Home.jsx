import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";
import Games from "../../Data/Games";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import Modal from "./model";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EasyWinSection = ({ showModal }) => {
  return (
    <div className="easyWin_section">
      <button className="glowButton redButton" onClick={showModal}>
        Aviator Prediction
      </button>
      <div className="buttonSpacer" />
      <button className="glowButton" onClick={showModal}>
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

  const [showModal, setShowModal] = useState(false);

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
            `https://spinz-servers-17da09bbdb53.herokuapp.com/${getGamePath(id)}`,
            getGameData(id),
            { headers }
          );
          if(response.status===400){
            alert("Insufficient Balance");
          }else{
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
      console.error("Error fetching or redirecting:", error);
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

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="home_container">
        <Navbar showSidebar={showSidebar} />
        <div className="content">
          <div className="games_slider">
            {showModal ? null : (
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
            )}
          </div>
          <EasyWinSection showModal={openModal} />
          <Modal visible={showModal} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Home;
