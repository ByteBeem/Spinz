import "./sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const Sidebar = ({ active, closeSidebar }) => {
  return (
    <aside className={`sidebar ${active}`}>
      <div className="top">
        <h3>Spinz</h3>
        <div className="close_btn" onClick={() => closeSidebar()}>
          &times;
        </div>
      </div>

      <div className="middle">
        <Link className="link" to="/dashboard">
          <IoGameController className="icon" />
          <span>Games</span>
        </Link>

        <Link className="link" to="/profile">
          <FaUser className="icon" />
          <span>Profile</span>
        </Link>

        <Link className="link" to="/reset">
          <IoSettingsSharp className="icon" />
          <span>Settings</span>
        </Link>

        <Link className="link" to="">
          <IoLogOut className="icon" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
