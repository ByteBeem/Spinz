import "./Navbar.scss";
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  return (
    <header>
      <ul className="games_filter">
        <li className="active">Soccer</li>
        <li>Pong</li>
        <li>Solitaire</li>
      </ul>

      <ul className="right">
        <IoNotifications className="notification" />
        <li className="profile">
          <img src="" alt="" />
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
