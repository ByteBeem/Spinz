import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/WordSearchScreen.css';
import { Link , useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function WordSearchScreen() {
  const { token, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState('0.00');
  const [activities, setActivities] = useState([]); 
  const [dates , setdates] = useState([]);

  const navigate = useNavigate();


  const logout = () => {
    
    localStorage.clear();

    navigate('/login');
  };

  const games = () => {
    
    localStorage.clear();

    navigate('/games');
  };

  
  const fetchBalance = async () => {
    try {
      setIsLoading(true);

     
      const response = await axios.get('https://heavenly-onyx-bun.glitch.me/getBalance2', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 206) {
        alert("Token Expired Login again!");
      } else {
        setBalance(response.data.balance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      setIsLoading(true);

      
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
        setdates(formattedDates);
      
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    fetchBalance();
    fetchActivities();
  }, [token ,token ]);

  return (
    <div className="wordSearchScreen">
      <div className="navbar">
        <ul>
          <li><a href="/dashboard">Home</a></li>
          <li><Link to="/games">Games</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><a href="#" onClick={logout}>Log Out</a></li>
        </ul>
      </div>
      <div className="container">
        <p className="balance">{'R ' + balance}</p>

        <div className="startButton" onClick={games}>
          {isLoading ? (
            <div className="loadingIndicator">Loading...</div>
          ) : (
            <p className="startButtonText">Start Game</p>
          )}
        </div>
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
            {activities.reverse().map((activity, index)=> (
                <tr key={index}>
                  <td>{activity.activity_description}</td>
                  <td>{activity.activity_details}</td>
                  <td>{ dates[index]}</td>
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

export default WordSearchScreen;
