import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from 'react-router-dom';
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

  const handlePlayClick = (id) => {
   
    switch (id) {
      case 1:
        window.location.href = 'https://spinz-spin.vercel.app';
        break;
      case 2:
        
      
        break;
      
      default:
        
        console.log('Unknown game id');
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
          <div className="form_btn" onClick={() => handlePlayClick(id)}>
            Play
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
