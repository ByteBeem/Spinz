import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Withdraw.css';
import logo from '../assets/new.png';

const backgroundStyle = {
  backgroundImage: 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4041567.jpg&f=1&nofb=1&ipt=18445b79bbb2c0f9c4b98c98dd83e88424ac79daf3b1721f6d802f092d369b4b&ipo=images")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

function Withdraw() {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [Currentbalance, setCurrentBalance] = useState('0.00');

  const token = localStorage.getItem('token');

  const fetchBalance = async () => {
    try {
      

      // Send the token as an Authorization header to the server
      const response = await axios.get('https://heavenly-onyx-bun.glitch.me/getBalance2', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 206) {
        alert("Token Expired Login again!");
      } else {
        setCurrentBalance(response.data.balance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      
    }
  };

  useEffect(() => {
    fetchBalance();
    
  }, [token  ]);

  useEffect(() => {
    // Fetch user's balance when the component mounts
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://heavenly-onyx-bun.glitch.me/getBalance2', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
        setCurrentBalance(response.data.balance);
      })
      .catch((error) => {
        console.error('Error fetching balance:', error);
      });
    }
  }, []);

  const handleDeposit = () => {
    setError('');
    setMessage('');
    setLoading(true);
  
   
    const token = localStorage.getItem('token');
  
    
    if (isNaN(amount) || amount <= 0) {
      setError('Invalid amount');
      setLoading(false);
      return;
    }
  
    
    
    const requestBody = {
      amount: parseFloat(amount),
    };
   
    axios
      .post('https://heavenly-onyx-bun.glitch.me/initiate-payment2', requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessage(`Redirecting...`);
        window.location.href = response.data.redirectUrl;
      
        setAmount('');
        
        
      })
      .catch((error) => {
        setError('Deposit failed. ' + error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  return (
    <div className="withdraw" style={backgroundStyle}>
        <img src={logo} className="small-logo" alt="logo" />
      <h1>Deposit Funds</h1>
      
      <div className="balance-info">
        <p>Your current balance: R {balance}</p>
        <p><h2>For Capitec Users :</h2>To Deposit to your account , make a trasnfer to account <b>2054670215</b> and use your name and surname as reference </p>
      </div>
      <div className="withdraw-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric" 
        />
       
      
        <button onClick={handleDeposit} disabled={loading}>
          {loading ? 'Processing...' : 'Deposit'}
        </button>
      </div>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Withdraw;
