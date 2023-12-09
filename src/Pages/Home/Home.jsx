import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from 'react-router-dom';
import "./Home.scss";

const Home = ({ showSidebar, active, closeSidebar }) => {
  const gamesSliderRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      if (touchStartX !== null) {
        const touchCurrentX = e.touches[0].clientX;
        const deltaX = touchCurrentX - touchStartX;

        if (gamesSliderRef.current) {
          gamesSliderRef.current.scrollLeft -= deltaX;
        }

        setTouchStartX(touchCurrentX);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
    };

    if (gamesSliderRef.current) {
      gamesSliderRef.current.addEventListener("touchstart", handleTouchStart);
      gamesSliderRef.current.addEventListener("touchmove", handleTouchMove);
      gamesSliderRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (gamesSliderRef.current) {
        gamesSliderRef.current.removeEventListener("touchstart", handleTouchStart);
        gamesSliderRef.current.removeEventListener("touchmove", handleTouchMove);
        gamesSliderRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [touchStartX]);

  const slot = () => {
    
    window.location.href = "https://spinz-spin.vercel.app/#";
  };

  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="home_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
          <div className="games_slider" ref={gamesSliderRef}>
            <div className="game_box1">
              <div className="play_button">
              <button onClick={slot}>Play</button>
              </div>
            </div>
            <div className="game_box2">
              <div className="play_button">
                <Link to="/games">
                  <button>Play</button>
                </Link>
              </div>
            </div>
            <div className="game_box3">
              <div className="play_button">
                <button>Play</button>
              </div>
            </div>
            <div className="game_box4">
              <div className="play_button">
                <button>Play</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
