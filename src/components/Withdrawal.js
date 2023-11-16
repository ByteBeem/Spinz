import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Withdraw.css';
import logo from '../assets/new.png';

function Withdraw() {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('');
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

  const handleWithdraw = () => {
    setError('');
    setMessage('');
    setLoading(true);
  
   
    const token = localStorage.getItem('token');
  
    
    if (isNaN(amount) || amount <= 0) {
      setError('Invalid withdrawal amount');
      setLoading(false);
      return;
    }
  
    
    
    const requestBody = {
      amount: parseFloat(amount),
      Account: account, 
      bank: bank, 
    };
  
    axios
      .post('https://heavenly-onyx-bun.glitch.me/withdraw', requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessage(`Withdrawal successful. New balance: R ${response.data.newBalance}`);
        setAmount('');
        setAccount('');
        setBank('');
      })
      .catch((error) => {
        setError('Withdrawal failed. ' + error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  return (
    <div className="withdraw">
        <img src={logo} className="small-logo" alt="logo" />
      <h1>Withdraw Funds</h1>
      <div className="balance-info">
        <p>Your current balance: R {balance}</p>
      </div>
      <div className="withdraw-form">
        <input
          type="number"
          placeholder="Amount to withdraw"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric" 
        />
        <input
          type="text"
          placeholder="Account Number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          inputMode="numeric" 
        />
      <div className="dropdown-container">
      <label>Select Bank:</label>
      <select
        className="dropdown"
        value={bank}
        onChange={(e) => setBank(e.target.value)}
      >
        <option value="">Select a Bank</option>
        <option value="Capitec">Capitec Bank</option>
        <option value="Standardbank">Standard Bank</option>
        <option value="Tymebank">TymeBank</option>
        <option value="Absa">Absa</option>
      </select>
    </div>
        <button onClick={handleWithdraw} disabled={loading}>
          {loading ? 'Processing...' : 'Withdraw'}
        </button>
      </div>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Withdraw;
