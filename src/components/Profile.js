import React, { useState, useEffect } from 'react';
import './styles/Profile.css';
import axios from 'axios'; 
import { useAuth } from './AuthContext';
import { useNavigate  } from 'react-router-dom';

function Profile() {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({}); 
  const [activities, setActivities] = useState([]);
  
  const navigate = useNavigate();

  const fullName = userData.name;
  const cellphone = userData.cell;
  const balance = userData.balance;
  const surname = userData.surname;
  const ID ="Protected";

  const handleWithdraw = () => {
    navigate('/withdraw');
  };


  const handleDeposit = () => {
    navigate('/deposit');
  };

  

  useEffect(() => {
    
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);

      fetchActivities(storedToken);
      fetchUserData(storedToken);
    }
  }, [setToken,setToken]);

  const fetchActivities = async (token) => {
    try {
     

    
      const response = await axios.get('https://heavenly-onyx-bun.glitch.me/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 206) {
        alert("Token Expired Login again!");
      } else {
        setActivities(response.data);
    
      }
    } catch (error) {
      
    } finally {
      
    }
  };

  const fetchUserData = (token) => {
    
    axios
      .get('https://heavenly-onyx-bun.glitch.me/getUserData', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
        setUserData(response.data);
      })
      .catch((error) => {
        
      });
  };

  
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-info">
        <div>
          <label>Full Names:</label>
          <span>{fullName}</span>
        </div>
        <div>
          <label>Surname:</label>
          <span>{surname}</span>
        </div>
        
        <div>
          <label>ID number:</label>
          <span>{ID}</span>
          </div>
          <div>
          <label>Cellphone:</label>
          <span>{cellphone}</span>
        </div>
        
        <div>
          <label>Balance:</label>
          <span>{`R ${balance}`}</span>
        </div>
      </div>
      <div className="buttons">
        <button className="withdraw-button" onClick={handleWithdraw}>
          Withdraw
        </button>
        <button className="deposit-button" onClick={handleDeposit}>
          Deposit
        </button>
      </div>
      <div className="activities">
        <h2>Activities</h2>
        {activities.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Info</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.activity_description}</td>
                  <td>{activity.activity_details}</td>
                  <td>{ activity.date_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Activities Yet</p>
        )}
      </div>
    
    </div>
  );
}

export default Profile;
