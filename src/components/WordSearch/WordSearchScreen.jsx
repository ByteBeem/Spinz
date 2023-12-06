import React, { useState, useEffect } from "react";
import axios from "axios";
import Typed from "typed.js";
import "./WordSearchScreen.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Betslip from "../Betslip/Betslip";

const backgroundStyle = {
  backgroundImage:
    'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4041567.jpg&f=1&nofb=1&ipt=18445b79bbb2c0f9c4b98c98dd83e88424ac79daf3b1721f6d802f092d369b4b&ipo=images")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

function WordSearchScreen() {
  const { token, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const [fixtures, setFixtures] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const games = () => {
    navigate("/choose");
  };

  const storeTokenInLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://heavenly-onyx-bun.glitch.me/getBalance2",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 206) {
        alert("Token Expired Login again!");
      } else {
        setBalance(response.data.balance);
        storeTokenInLocalStorage(token);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFixtures = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://raw.githubusercontent.com/openfootball/football.json/master/2022-23/en.1.json"
      );

      if (response.status === 200) {
        const upcomingFixtures = response.data.matches.filter(
          (match) => match.status === "SCHEDULED"
        );
        setFixtures(upcomingFixtures);
      }
    } catch (error) {
      console.error("Error fetching fixtures:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchFixtures();

    // Typed text animation script
    var typed = new Typed(".startButtonText", {
      strings: ["Welcome", "Play & Win", "Deposit Now", "Instant Withdrawals"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    return () => {
      // Clean up Typed instance on component unmount
      typed.destroy();
    };
  }, [token]);

  return (
    <div className="wordSearchScreen" style={backgroundStyle}>
      <div className="navbar">
        <ul>
          <li>
            <a href="/dashboard">Home</a>
          </li>
          <li>
            <Link to="/choose">Games</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <a href="#" onClick={logout}>
              Log Out
            </a>
          </li>
        </ul>
      </div>
      <div className="container">
        <p className="balance">{"R " + balance}</p>
        <h3>
          {" "}
          <p className="startButtonText"></p>
        </h3>

        <div className="startButton" onClick={games}>
          {isLoading ? (
            <div className="loadingIndicator">Loading...</div>
          ) : (
            <p className="startButtonText">WELCOME TO SPINZ</p>
          )}
        </div>
      </div>
      <div className="soccer-betting">
        <h2 style={{ color: "white" }}>Soccer Betting</h2>
        {fixtures.length > 0 ? (
          <div className="fixtures">
            {fixtures.map((fixture, index) => (
              <div key={index} className="fixture">
                <p className="fixture-title">
                  {fixture.team1} vs {fixture.team2}
                </p>
                <p className="fixture-info">{fixture.date}</p>
                <button className="odds-button">View Odds</button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "white" }}>No Fixtures Available</p>
        )}
      </div>
      <Betslip />
    </div>
  );
}

export default WordSearchScreen;
