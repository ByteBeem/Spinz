import "./sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="top">
        <h3>Spinz</h3>
      </div>

      <div className="middle">
        <Link className="link active" to="/dashboard">
          <IoGameController className="icon" />
          Games
        </Link>

        <Link className="link" to="/profile">
          <FaUser className="icon" />
          Profile
        </Link>

        <Link className="link" to="/reset">
          <IoSettingsSharp className="icon" />
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
