import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Withdraw.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Withdraw({ showSidebar, active, closeSidebar }) {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [bank, setBank] = useState("");
  const [iD, setiD] = useState("");
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

  const handleWithdraw = () => {
    setError("");
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (isNaN(amount) || amount <= 0) {
      setError("Invalid withdrawal amount");
      setLoading(false);
      return;
    }

    if (isNaN(iD) || iD < 13) {
      setError("Invalid ID number");
      setLoading(false);
      return;
    }
    

    const requestBody = {
      amount: parseFloat(amount),
      Account: account,
      bank: bank,
      password: iD,
    };

    axios
      .post("https://spinz-servers-17da09bbdb53.herokuapp.com/withdraw", requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessage(
          `Withdrawal successful. New balance: R ${response.data.newBalance}`
        );
        setAmount("");
        setAccount("");
        setBank("");
        setiD("");
      })
      .catch((error) => {
        setError("Withdrawal failed. " + error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="withdraw">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="withdraw_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
          <div className="balance_info">
            <span>Current Balance:</span>
            <h1>R{balance}</h1>
          </div>

          <div className="middle">
            <div className="left">
              <h3>Withdraw Funds</h3>
              <div>
                <label>Withdraw Amount</label>
                <br />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="numeric"
                />
              </div>

              <div>
                <label>Account Number</label>
                <br />
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  inputMode="numeric"
                />
              </div>

              <div>
                <label>ID Number</label>
                <br />
                <input 
                type="text"
                value={iD}
                onChange={(e) => setiD(e.target.value)}
                inputMode="numeric"
                />
              </div>
            </div>
            <div className="right">
              <div className="dropdown_container">
                <span>Select Bank:</span>
                <br />
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

              <button
                className="form_btn"
                onClick={handleWithdraw}
                disabled={loading}
              >
                {loading ? "Processing..." : "Withdraw"}
              </button>

              {message && <p className="success-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
