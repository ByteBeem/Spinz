import React, { useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";

const Home = ({ showSidebar, active, closeSidebar }) => {
  const gamesSliderRef = useRef(null);

  const scrollLeft = () => {
    if (gamesSliderRef.current) {
      gamesSliderRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (gamesSliderRef.current) {
      gamesSliderRef.current.scrollLeft += 200; 
    }
  };

  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="home_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
          <div className="games_slider" ref={gamesSliderRef}>
            <div className="game_box"></div>
            <div className="game_box"></div>
            <div className="game_box"></div>
            <div className="game_box"></div>
          </div>
          <div className="scroll_buttons">
            <button onClick={scrollLeft}>Scroll Left</button>
            <button onClick={scrollRight}>Scroll Right</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
