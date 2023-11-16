import React, { useState } from 'react';
import axios from 'axios';
import './styles/Deposit.css';

const PAYFAST_MERCHANT_ID = '10030487';
const PAYFAST_MERCHANT_KEY = 'fojcf3dzm5pe0';

function DepositScreen() {
  const [amount, setAmount] = useState(0);
  const [paymentPageUrl, setPaymentPageUrl] = useState('');
  const [error, setError] = useState(null);

  const initiatePayment = async () => {
    try {
     
      const paymentData = {
        merchant_id: PAYFAST_MERCHANT_ID,
        merchant_key: PAYFAST_MERCHANT_KEY,
        amount: amount,
        
      };

     
      const response = await axios.post('/initiate-payment2', paymentData);

      if (response.data.success) {
        
        setPaymentPageUrl(response.data.paymentPageUrl);
      } else {
        setError('Payment initiation failed');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('Error initiating payment');
    }
  };

  return (
    <div>
      <h2>Deposit Screen</h2>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={initiatePayment}>Initiate Payment</button>

      {paymentPageUrl && (
        <div>
          <p>Payment initiation successful. Redirect to PayFast:</p>
          <a href={paymentPageUrl} target="_blank" rel="noopener noreferrer">
            Pay Now
          </a>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default DepositScreen;
