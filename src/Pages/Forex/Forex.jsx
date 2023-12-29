import React, { useState, useEffect } from "react";
import './Forex.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Modal from "./model";
import ForexChart from './ForexChart';
import axios from 'axios';

const Forex = ({ showSidebar, active, closeSidebar }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tradeDetails, setTradeDetails] = useState(null); // New state to store trade details

  useEffect(() => {
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeposit = () => {
    setError("");
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token not found , Go log in again.");
      setLoading(false);
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError("Invalid amount");
      setLoading(false);
      return;
    }

    if (amount < 100) {
      setError("Minimum amount is R100");
      setLoading(false);
      return;
    }

    const requestBody = {
      amount: parseFloat(amount),
    };

    axios
      .post(
        "https://spinz-servers-17da09bbdb53.herokuapp.com/trade",
        requestBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Store trade details in state
        setTradeDetails(response.data);

        // Set success message
        setMessage(`Successfully placed a trade.`);

        setAmount("");
      })
      .catch((error) => {
        setError("Trading failed. " + error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="forex">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="forex_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
          <ForexChart />
          <h3>Let's Handle The Trading for you!</h3>
          <div className="deposit_form">
            <div>
              <label>Amount</label>
              <br />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="numeric"
              />
              <button
                className="form_btn"
                onClick={handleDeposit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Begin"}
              </button>
              {message && <p className="success-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
              {/* Display trade details if available */}
              {tradeDetails && (
                <p className="trade-details">
                  Placed a trade of R{tradeDetails.amount} - Estimated outcome: R{tradeDetails.estimatedOutcome}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && <Modal visible={showModal} closeModal={closeModal} />}
    </div>
  );
};

export default Forex;
