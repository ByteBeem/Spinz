import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
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
    const { setToken } = useAuth();

    const handlePlayClick = async (id) => {
      const storedToken = localStorage.getItem("token");
      setLoading(true);
  
      try {
        const headers = {
          Authorization: `Bearer ${storedToken}`,
        };
  
        switch (id) {
          case 1:
            window.location.href = "https://spinz-spin.vercel.app";
            break;
          case 2:
            window.location.href = "https://word-search-wine.vercel.app/";
            break;
          case 3:
           
            break;
          case 4:
            window.location.href = "https://tac-game.vercel.app/";
            break;
          case 5:
            const response = await axios.get(
              "https://heavenly-onyx-bun.glitch.me/dice",
              { headers }
            );
            const { gameLink } = response.data;
  
            window.location.href = gameLink;
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
