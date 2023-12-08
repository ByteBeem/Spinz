import "./sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { IoHome  } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { GiWallet } from "react-icons/gi";
import {useState} from 'react';
import { IoIosChatbubbles } from "react-icons/io";

const Sidebar = ({ active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.clear();
    setTimeout(() => {
      
      
      setLoading(false);
      window.location.href = "/login";
      closeSidebar();
    }, 5000);
  };
  return (
    <aside className={`sidebar ${active}`}>
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
          <p className="loading-text">Logging out...</p>
        </div>
      )}
      <div className="top">
        <h3>Spinz</h3>
        <div className="close_btn" onClick={() => closeSidebar()}>
          &times;
        </div>
      </div>

      <div className="middle">
        <Link className="link" to="/dashboard" onClick={() => closeSidebar()}>
          <IoHome className="icon" />
          <span>Home</span>
        </Link>

        <Link className="link" to="/wallets" onClick={() => closeSidebar()}>
          <GiWallet className="icon" />
          <span>Wallet</span>
        </Link>

        <Link className="link" to="/profile" onClick={() => closeSidebar()}>
          <FaUser className="icon" />
          <span>Profile</span>
        </Link>

        <Link className="link" to="" onClick={() => closeSidebar()}>
          <IoIosChatbubbles className="icon" />
          <span>Support</span>
        </Link>
      

        <Link className="link" to="" onClick={() => { closeSidebar(); handleLogout(); }}>
  <IoLogOut className="icon" />
  <span>Logout</span>
</Link>

      </div>
    </aside>
  );
};

export default Sidebar;