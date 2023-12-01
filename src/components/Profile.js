import React, { useState, useEffect } from 'react';
import './styles/Profile.css';
import axios from 'axios'; 
import { useAuth } from './AuthContext';
import { useNavigate  } from 'react-router-dom';

const backgroundStyle = {
  backgroundImage: 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4041567.jpg&f=1&nofb=1&ipt=18445b79bbb2c0f9c4b98c98dd83e88424ac79daf3b1721f6d802f092d369b4b&ipo=images")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};


function Profile() {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({}); 
  const [activities, setActivities] = useState([]);
  const [Dates , setDates] = useState([]);
  
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
        
        const formattedDates = response.data.map((activity) => {
          const date = activity.date_time;
          const originalDate = new Date(date);
          return originalDate.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            
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
    <div className="profile" style={backgroundStyle}>
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
            {activities.reverse().map((activity, index) => (
                <tr key={index}>
                  <td>{activity.activity_description}</td>
                  <td>{activity.activity_details}</td>
                  <td>{ Dates[index]}</td>
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
