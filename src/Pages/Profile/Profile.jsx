import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import UserProfile from "../../assets/user.jpeg";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import Activities from "../../Data/Activities";

function Profile({ showSidebar, active, closeSidebar }) {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({});
  const [activities, setActivities] = useState(Activities);
  const [Dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fullName = userData.name;
  const email = userData.email;
  const balance = userData.balance;
  const surname = userData.surname;
  const ID = "*************";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchActivities(token);
      fetchUserData(token);
    }
    else {
      alert("You need to Login first...")
      window.location.href = "www.spinz4bets.co.za";
    };

  }, []);

  const fetchActivities = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://spinzserver-e34cd148765a.herokuapp.com/activities",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      setActivities(response.data);
      setDates(
        response.data.map((activity) => new Date(activity.date_time))
      );
    } catch (error) {

      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get("https://spinzserver-e34cd148765a.herokuapp.com/getUserData", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {

        setUserData(response.data);
      })
      .catch((error) => {

        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="profile">
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
        </div>
      )}
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
              <div className="text_item">{fullName}</div>

              <span>Surname:</span>
              <div className="text_item">{surname}</div>

              <span>ID Number:</span>
              <div className="text_item">{ID}</div>

              <span>Email:</span>
              <div className="text_item">{email}</div>
              <div className="verification">
                <div className="red-dot"></div>
                <span>Not Verified</span>

              </div>
            </div>
          </div>
        </div>

        <Link className="form_btn" to="/reset">
          Change Password
        </Link>
        <Link className="form_btn" to="/verify">
          Verify
        </Link>
      </div>

    </div>
  );
}

export default Profile;
