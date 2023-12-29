import React, { useState, useEffect } from "react";
import './Forex.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Modal from "./model";
import ForexChart from './ForexChart';

const Forex = ({ showSidebar, active, closeSidebar }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); 

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
      setError("Token not found, go log in again.");
      setLoading(false);
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError("Invalid amount");
      setLoading(false);
      return;
    }

    if (amount < 200) {
      setError("Minimum amount is R200");
      setLoading(false);
      return;
    }

   
    setTimeout(() => {
      setLoading(false);
      setMessage("Deposit successful!");
    }, 2000);
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
            </div>
          </div>
        </div>
      </div>
    
      {showModal && <Modal visible={showModal} closeModal={closeModal} />}
    </div>
  );
};

export default Forex;
