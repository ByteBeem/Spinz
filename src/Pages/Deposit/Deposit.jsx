import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Deposit.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Deposit({ showSidebar, active, closeSidebar }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [Currentbalance, setCurrentBalance] = useState("0.00");

  const token = localStorage.getItem("token");

  const fetchBalance = async () => {
    try {
      // Send the token as an Authorization header to the server
      const response = await axios.get(
        "https://spinz-servers-17da09bbdb53.herokuapp.com/getBalance2",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 206) {
        alert("Token Expired Login again!");
      } else {
        setCurrentBalance(response.data.balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [token]);

  useEffect(() => {
    // Fetch user's balance when the component mounts
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://spinz-servers-17da09bbdb53.herokuapp.com/getBalance2", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBalance(response.data.balance);
          setCurrentBalance(response.data.balance);
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });
    }
  }, []);

  const handleDeposit = () => {
    setError("");
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");
    console.log("token",token);
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

    const requestBody = {
      amount: parseFloat(amount),
    };

    axios
      .post(
        "https://spinz-servers-17da09bbdb53.herokuapp.com/deposit",
        requestBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setMessage(`Redirecting...`);
        window.location.href = response.data.redirectUrl;

        setAmount("");
      })
      .catch((error) => {
        setError("Deposit failed. " + error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="deposit">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="deposit_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
          <div className="balance_info">
            <span>Current Balance:</span>
            <h1>R{balance}</h1>
          </div>

          <div className="middle">
            <div className="info">
              <p>
                <h2>For Capitec Users :</h2>To Deposit to your account , make a
                transfer to account: <b>1051763436</b> Choose bank: <b>Capitec Business</b> and use your name and
                surname as reference{" "}
              </p>
            </div>

            <p>
               <h2><b>Other banks use the option below :</b> </h2> 
              </p>

            <div className="deposit_form">
              <h3>Deposit Funds</h3>
              <div>
                <label>Deposit Amount</label>
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
                  {loading ? "Processing..." : "Deposit"}
                </button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
