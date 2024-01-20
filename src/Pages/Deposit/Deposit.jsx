import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Deposit.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Navbar from "../../components/Navbar/Navbar";

function Deposit({ showSidebar, active, closeSidebar }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [show , setShow] = useState(true);
  const [orderId, setOrderId] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Currentbalance, setCurrentBalance] = useState("0.00");

  const token = localStorage.getItem("token");

  const fetchBalance = async () => {
    try {
      // Send the token as an Authorization header to the server
      const response = await axios.get(
        "https://mainp-server-c7a5046a3a01.herokuapp.com/balance",
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
        .get("https://mainp-server-c7a5046a3a01.herokuapp.com/balance", {
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

        if ( amount <= 10) {
      setError("Min amount is R10");
      setLoading(false);
      return;
    }

    const requestBody = {
      amount: parseFloat(amount),
    };

    axios
      .post(
        "https://mainp-server-c7a5046a3a01.herokuapp.com/deposit",
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

 const createOrder = (data, actions) => {
    
    return actions.order
      .create({
        purchase_units: [
          {
            description: "depositToSpinz",
            amount: {
              currency_code: "USD",
              value: 20,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderId(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("Something went wrong");
  };

  return (
    <div className="deposit">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="deposit_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">


          <div className="middle">
            <div className="info">
               <h2><b>International Method :</b> </h2> 
                         <PayPalScriptProvider
            options={{
              "client-id": "Aft3OCQujzt42-4_EAtWyIeLnZ-RsLynG4BbhVztRHfKHLe2OxPEl3a1HakXW1b4ASv1YCsUaOjLgm-A",
            }}
          >
            {show ? (
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            ) : null}
          </PayPalScriptProvider>
            </div>

            <div className="deposit_form">
             <h2><b>SA Local bank :</b> </h2> 
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
