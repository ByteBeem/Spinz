import "./Navbar.scss";
import { IoNotifications } from "react-icons/io5";

const Navbar = ({ showSidebar }) => {
  return (
    <header>
      <div className="menu_btn" onClick={() => showSidebar()}>
        &#9776;
      </div>
      <ul className="games_filter">
        <li className="active">Soccer</li>
        <li>Slot</li>
        <li>WordSearch</li>
      </ul>

      <ul className="right">
        <div className="notification">
          <IoNotifications className="icon" />
          <div className="count">5</div>
        </div>
        <li className="profile">
          <img src="" alt="" />
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
