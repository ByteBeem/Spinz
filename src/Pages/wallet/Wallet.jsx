import "./wallet.scss";
import "../../App.scss";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { FiLoader } from "react-icons/fi";
import React, {useState , useEffect} from 'react';
import { Link } from 'react-router-dom'; 

function Wallet  ({ showSidebar, active, closeSidebar }) {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({});

  const balance = userData.balance;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, [setToken]);

  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get("https://heavenly-onyx-bun.glitch.me/getUserData", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {});
  };

  return (
    <div className="account_info">
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
        </div>
      )}

<Sidebar active={active} closeSidebar={closeSidebar} />
      <span>Account Balance:</span>

      <Navbar showSidebar={showSidebar} />
      <div className="balance">{`R${balance}`}</div>


      <Link className="form_btn" to="/withdraw">
        Withdraw
      </Link>
      <Link className="form_btn" to="/deposit">
        Deposit
      </Link>
    </div>
  );
};

export default Wallet;