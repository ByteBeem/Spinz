import "./sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { IoHome  } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import {useState} from 'react';

const Sidebar = ({ active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      // Implement actual logout logic here
      // ...
      closeSidebar();
    }, 5000);
  };
  return (
    <aside className={`sidebar ${active}`}>
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
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

        <Link className="link" to="/profile" onClick={() => closeSidebar()}>
          <FaUser className="icon" />
          <span>Profile</span>
        </Link>

        <Link className="link" to="/reset" onClick={() => closeSidebar()}>
          <IoSettingsSharp className="icon" />
          <span>Settings</span>
        </Link>

        <Link className="link" to="" onClick={handleLogout}>
          <IoLogOut className="icon" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;