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
  const cellphone = userData.cell;
  const balance = userData.balance;
  const surname = userData.surname;
  const ID = "*************";

  useEffect(() => {
    fetchActivities();
    fetchUserData();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://capable-faint-scallop.glitch.me/activities",
        {
          credentials: 'include',
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

  const fetchUserData = () => {
    setLoading(true);
    axios
      .get("https://capable-faint-scallop.glitch.me/getUserData", {
        withCredentials: true, 
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

              <span>Phone:</span>
              <div className="text_item">{cellphone}</div>
            </div>
          </div>
        </div>

        <Link className="form_btn" to="/reset">
          Change Password
        </Link>

      <Link className="form_btn" to="#">
          Delete Account
        </Link>
{/* 
 <div className="activity">
          <span>Activity</span>
          {activities.length > 0 ? (
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                {activities.reverse().map(({ id, date_time, activity_description, activity_details, result }) => (
                  <tr key={id} className={result === 'fail' ? 'fail' : ''}>
                    <td id="time">{new Date(date_time).toLocaleString()}</td>
                    <td id="title">{activity_description}</td>
                    <td id="body">{activity_details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Activities Yet</p>
          )}
        </div>
          */}
      </div>
          
    </div>
  );
}

export default Profile;
