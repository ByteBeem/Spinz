import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import UserProfile from "../../assets/user.png";
import { Link } from "react-router-dom";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";

const backgroundStyle = {
  backgroundImage:
    'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4041567.jpg&f=1&nofb=1&ipt=18445b79bbb2c0f9c4b98c98dd83e88424ac79daf3b1721f6d802f092d369b4b&ipo=images")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

function Profile({ showSidebar, active, closeSidebar }) {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({});
  const [activities, setActivities] = useState([]);
  const [Dates, setDates] = useState([]);

  const navigate = useNavigate();

  const fullName = userData.name;
  const cellphone = userData.cell;
  const balance = userData.balance;
  const surname = userData.surname;
  const ID = "Protected";

  const handleWithdraw = () => {
    navigate("/withdraw");
  };

  const handleDeposit = () => {
    navigate("/deposit");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      fetchActivities(storedToken);
      fetchUserData(storedToken);
    }
  }, [setToken, setToken]);

  const fetchActivities = async (token) => {
    try {
      const response = await axios.get(
        "https://heavenly-onyx-bun.glitch.me/activities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 206) {
        alert("Token Expired Login again!");
      } else {
        setActivities(response.data);

        const formattedDates = response.data.map((activity) => {
          const date = activity.date_time;
          const originalDate = new Date(date);
          return originalDate.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
        });
        setDates(formattedDates);
      }
    } catch (error) {
    } finally {
    }
  };

  const fetchUserData = (token) => {
    axios
      .get("https://heavenly-onyx-bun.glitch.me/getUserData", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {});
  };

  return (
    <div className="profile">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="profile_container">
        <Navbar showSidebar={showSidebar} />

        <div className="top">
          <div className="user_info">
            <div className="profile_pic">
              <img src={UserProfile} alt="" />
            </div>

            <div className="text">
              <span>Fullname:</span>
              <div className="text_item">Dori Codes{fullName}</div>

              <span>UserName:</span>
              <div className="text_item">Dorix26{surname}</div>

              <span>User ID:</span>
              <div className="text_item">{ID}</div>

              <span>Phone:</span>
              <div className="text_item">+555 {cellphone}</div>
            </div>
          </div>

          <div className="account_info">
            <span>Account Blanace:</span>
            <div className="balance">{`$${balance}`}</div>

            <Link className="btn" to="/withdraw">
              CashOut
            </Link>
            <Link className="btn" to="/deposit">
              Deposit
            </Link>
          </div>
        </div>

        <div className="activity">
          <span>Activity</span>
        </div>
      </div>
    </div>

    //   <div className="activities">
    //     <h2>Activities</h2>
    //     {activities.length > 0 ? (
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Type</th>
    //             <th>Info</th>
    //             <th>Date</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {activities.reverse().map((activity, index) => (
    //             <tr key={index}>
    //               <td>{activity.activity_description}</td>
    //               <td>{activity.activity_details}</td>
    //               <td>{Dates[index]}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     ) : (
    //       <p>No Activities Yet</p>
    //     )}
    //   </div>
    // </div>
  );
}

export default Profile;
