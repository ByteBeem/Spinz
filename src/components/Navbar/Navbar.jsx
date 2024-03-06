import "./Navbar.scss";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import ErrorModal from "../../Pages/ErrorModal/ErrorModal";

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const balance = userData.balance;
  const country = userData.country;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      fetchUserData(token);
    
    }else {
      setErrorMessage("You first need to Log in...");
      setErrorModalOpen(true);
      window.location.href = "https://spinz-three.vercel.app/login";
   
      
    }
   
  }, []);
  
  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get("https://capable-faint-scallop.glitch.me/balance", {
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      })
      .then((response) => {
        const balance = response.data;
        if (balance !== undefined) {
          setUserData(balance);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const getCurrencySymbol = () => {
  const symbol = country === 'ZA' ? 'R' : '$';
  localStorage.setItem("country", country);
  return symbol;
};

  return (
    <header>
      {/* <div className="menu_btn" onClick={() => showSidebar()}>
        &#9776;
      </div> */}
      <ul className="games_filter">
        <li>
          <div className="balance">
            {loading ? "Loading..." : `${getCurrencySymbol()}${balance.toString()}`}
          </div>
        </li>
      </ul>

      <div >
    <ErrorModal
    errorMessage={errorMessage}
    isOpen={errorModalOpen}
    onClose={() => setErrorModalOpen(false)}
  />
  </div>
    </header>
   
  );
};

export default Navbar;
